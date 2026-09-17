using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml.Linq;

var root = FindRoot(Directory.GetCurrentDirectory());
var contentRoot = Path.Combine(root, "content");
var publicRoot = Path.Combine(root, "public");
var versionPath = Path.Combine(root, "version.json");
var version = JsonSerializer.Deserialize<VersionInfo>(File.ReadAllText(versionPath))
              ?? throw new InvalidOperationException("version.json is invalid.");
if (!Regex.IsMatch(version.Version, @"^\d+\.\d+\.\d{6}\.\d{3}$"))
    throw new InvalidOperationException($"Version '{version.Version}' must use major.minor.yymmdd.build.");

var items = Directory.EnumerateFiles(contentRoot, "*.md", SearchOption.AllDirectories)
    .Select(ReadItem)
    .OrderByDescending(x => x.Published)
    .ToArray();

Directory.CreateDirectory(Path.Combine(publicRoot, "generated"));
File.Copy(versionPath, Path.Combine(publicRoot, "version.json"), true);
var jsonOptions = new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
File.WriteAllText(Path.Combine(publicRoot, "generated", "content-index.json"), JsonSerializer.Serialize(items, jsonOptions));
File.WriteAllText(Path.Combine(publicRoot, "rss.xml"), BuildRss(items));
File.WriteAllText(Path.Combine(publicRoot, "atom.xml"), BuildAtom(items));
File.WriteAllText(Path.Combine(publicRoot, "sitemap.xml"), BuildSitemap(items));
File.WriteAllText(Path.Combine(publicRoot, "llms.txt"), BuildLlms(items, version));
WriteStaticContentPages(publicRoot, items, version);
Console.WriteLine($"Generated {items.Length} content records for v{version.Version}.");

static string FindRoot(string start)
{
    var current = new DirectoryInfo(start);
    while (current is not null)
    {
        if (File.Exists(Path.Combine(current.FullName, "version.json"))) return current.FullName;
        current = current.Parent;
    }
    throw new DirectoryNotFoundException("Repository root not found.");
}

static ContentRecord ReadItem(string path)
{
    var text = File.ReadAllText(path);
    if (!text.StartsWith("---")) throw new InvalidOperationException($"Missing front matter: {path}");
    var parts = text.Split(new[] { "\n---\n", "\r\n---\r\n" }, 2, StringSplitOptions.None);
    if (parts.Length != 2) throw new InvalidOperationException($"Invalid front matter: {path}");
    var meta = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
    foreach (var line in parts[0].Split('\n').Skip(1))
    {
        var i = line.IndexOf(':');
        if (i > 0) meta[line[..i].Trim()] = line[(i + 1)..].Trim().Trim('"', '\'');
    }
    string Get(string key) => meta.TryGetValue(key, out var value) ? value : throw new InvalidOperationException($"Missing {key}: {path}");
    var tags = meta.TryGetValue("tags", out var tagValue)
        ? tagValue.Trim('[', ']').Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).Select(x => x.Trim('"', '\'')).ToArray()
        : Array.Empty<string>();
    var body = StripMarkdown(parts[1].Trim());
    return new ContentRecord(Get("kind"), Get("title"), Get("slug"), Get("summary"), DateOnly.Parse(Get("published")), tags, body);
}

static string StripMarkdown(string source)
{
    return source
        .Replace("```mermaid", "")
        .Replace("```", "")
        .Replace("**", "")
        .Replace("__", "")
        .Trim();
}

static void WriteStaticContentPages(string publicRoot, IEnumerable<ContentRecord> items, VersionInfo version)
{
    foreach (var item in items)
    {
        var dir = Path.Combine(publicRoot, "content", item.Slug);
        Directory.CreateDirectory(dir);
        var canonical = $"https://chicodotnet.github.io/content/{item.Slug}/";
        var type = item.Kind == "video" ? "VideoObject" : "TechArticle";
        var tags = string.Join(", ", item.Tags);
        var html = $$"""
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{WebUtility.HtmlEncode(item.Title)}} — ChicoDotNet</title>
  <meta name="description" content="{{WebUtility.HtmlEncode(item.Summary)}}">
  <meta name="keywords" content="{{WebUtility.HtmlEncode(tags)}}">
  <link rel="canonical" href="{{canonical}}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"{{type}}","headline":{{JsonSerializer.Serialize(item.Title)}},"description":{{JsonSerializer.Serialize(item.Summary)}},"datePublished":"{{item.Published:yyyy-MM-dd}}","author":{"@type":"Person","name":"Alfonso Lara Ramos","url":"https://chicodotnet.github.io/"}}</script>
  <style>body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:780px;margin:0 auto;padding:48px 24px;color:#172033;line-height:1.65}a{color:#273cbe}.meta{color:#667085}.badge{display:inline-block;padding:4px 8px;border:1px solid #d0d5dd;border-radius:999px;margin:0 6px 6px 0}</style>
</head>
<body>
  <p><a href="/">← ChicoDotNet</a></p>
  <h1>{{WebUtility.HtmlEncode(item.Title)}}</h1>
  <p class="meta">{{item.Kind}} · {{item.Published:yyyy-MM-dd}} · v{{WebUtility.HtmlEncode(version.Version)}}</p>
  <p>{{WebUtility.HtmlEncode(item.Summary)}}</p>
  <div>{{string.Join("", item.Tags.Select(t => $"<span class=\"badge\">{WebUtility.HtmlEncode(t)}</span>"))}}</div>
  <hr>
  <pre style="white-space:pre-wrap;font:inherit">{{WebUtility.HtmlEncode(item.Body)}}</pre>
</body>
</html>
""";
        File.WriteAllText(Path.Combine(dir, "index.html"), html);
    }
}

static string BuildRss(IEnumerable<ContentRecord> items) => new XDocument(
    new XElement("rss", new XAttribute("version", "2.0"),
        new XElement("channel",
            new XElement("title", "ChicoDotNet"),
            new XElement("link", "https://chicodotnet.github.io/"),
            new XElement("description", "Engineering notes, diagrams and videos from ChicoDotNet."),
            items.Where(x => x.Kind == "article").Select(x => new XElement("item",
                new XElement("title", x.Title),
                new XElement("link", $"https://chicodotnet.github.io/content/{x.Slug}/"),
                new XElement("guid", $"https://chicodotnet.github.io/content/{x.Slug}/"),
                new XElement("pubDate", x.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("R")),
                new XElement("description", x.Summary)))))).ToString();

static string BuildAtom(IEnumerable<ContentRecord> items)
{
    XNamespace a = "http://www.w3.org/2005/Atom";
    var updated = items.Any() ? items.Max(x => x.Published).ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O") : DateTime.UnixEpoch.ToString("O");
    return new XDocument(new XElement(a + "feed",
        new XElement(a + "title", "ChicoDotNet"),
        new XElement(a + "id", "https://chicodotnet.github.io/"),
        new XElement(a + "updated", updated),
        items.Where(x => x.Kind == "article").Select(x => new XElement(a + "entry",
            new XElement(a + "title", x.Title),
            new XElement(a + "id", $"https://chicodotnet.github.io/content/{x.Slug}/"),
            new XElement(a + "updated", x.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O")),
            new XElement(a + "summary", x.Summary))))).ToString();
}

static string BuildSitemap(IEnumerable<ContentRecord> items)
{
    XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
    return new XDocument(new XElement(ns + "urlset",
        new XElement(ns + "url", new XElement(ns + "loc", "https://chicodotnet.github.io/")),
        items.Select(x => new XElement(ns + "url",
            new XElement(ns + "loc", $"https://chicodotnet.github.io/content/{x.Slug}/"),
            new XElement(ns + "lastmod", x.Published.ToString("yyyy-MM-dd")))))).ToString();
}

static string BuildLlms(IEnumerable<ContentRecord> items, VersionInfo version)
{
    var sb = new StringBuilder();
    sb.AppendLine("# ChicoDotNet");
    sb.AppendLine($"> Public engineering home for Alfonso Lara Ramos. Release v{version.Version}.");
    sb.AppendLine();
    foreach (var item in items) sb.AppendLine($"- [{item.Kind}] [{item.Title}](https://chicodotnet.github.io/content/{item.Slug}/): {item.Summary}");
    return sb.ToString();
}

record ContentRecord(string Kind, string Title, string Slug, string Summary, DateOnly Published, string[] Tags, string Body);
record VersionInfo(string Version, string ReleaseDate, string Channel);
