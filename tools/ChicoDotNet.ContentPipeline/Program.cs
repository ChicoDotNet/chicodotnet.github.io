using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml.Linq;

var root = FindRoot(Directory.GetCurrentDirectory());
var contentRoot = Path.Combine(root, "content");
var publicRoot = Path.Combine(root, "public");
var baseVersionPath = Path.Combine(root, "version.json");

var baseVersion = JsonSerializer.Deserialize<BaseVersion>(
    File.ReadAllText(baseVersionPath),
    new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
    ?? throw new InvalidOperationException("version.json is invalid.");

if (string.IsNullOrWhiteSpace(baseVersion.Version) || !Regex.IsMatch(baseVersion.Version, @"^\d+\.\d+$"))
    throw new InvalidOperationException($"Base version '{baseVersion.Version}' must use major.minor, for example 0.1.");

var nowUtc = DateTimeOffset.UtcNow;
var dateCode = Environment.GetEnvironmentVariable("RELEASE_DATE_UTC") ?? nowUtc.ToString("yyMMdd");
if (!Regex.IsMatch(dateCode, @"^\d{6}$"))
    throw new InvalidOperationException("RELEASE_DATE_UTC must use yyMMdd in UTC.");

var buildText = Environment.GetEnvironmentVariable("RELEASE_BUILD") ?? "0";
if (!int.TryParse(buildText, out var build) || build < 0)
    throw new InvalidOperationException("RELEASE_BUILD must be a non-negative integer.");

var channel = Environment.GetEnvironmentVariable("RELEASE_CHANNEL") ?? "dev";
var commitSha = Environment.GetEnvironmentVariable("GITHUB_SHA");
var runtime = new RuntimeVersion(
    $"{baseVersion.Version}.{dateCode}.{build:D3}",
    baseVersion.Version,
    dateCode,
    build,
    channel,
    commitSha,
    nowUtc.ToString("O"));

var items = Directory.EnumerateFiles(contentRoot, "*.md", SearchOption.AllDirectories)
    .Select(ReadItem)
    .OrderByDescending(x => x.Published)
    .ToArray();

Directory.CreateDirectory(Path.Combine(publicRoot, "generated"));
var jsonOptions = new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
File.WriteAllText(Path.Combine(publicRoot, "version.json"), JsonSerializer.Serialize(runtime, jsonOptions));
File.WriteAllText(Path.Combine(publicRoot, "generated", "content-index.json"), JsonSerializer.Serialize(items, jsonOptions));
File.WriteAllText(Path.Combine(publicRoot, "rss.xml"), BuildRss(items));
File.WriteAllText(Path.Combine(publicRoot, "atom.xml"), BuildAtom(items));
File.WriteAllText(Path.Combine(publicRoot, "sitemap.xml"), BuildSitemap(items));
File.WriteAllText(Path.Combine(publicRoot, "llms.txt"), BuildLlms(items, runtime));
WriteStaticContentPages(publicRoot, items, runtime);

Console.WriteLine($"Generated {items.Length} content records for v{runtime.Version} ({runtime.Channel}).");

static string FindRoot(string start)
{
    for (var current = new DirectoryInfo(start); current is not null; current = current.Parent)
        if (File.Exists(Path.Combine(current.FullName, "version.json"))) return current.FullName;

    throw new DirectoryNotFoundException("Repository root not found.");
}

static ContentRecord ReadItem(string path)
{
    var text = File.ReadAllText(path).Replace("\r\n", "\n");
    if (!text.StartsWith("---\n", StringComparison.Ordinal))
        throw new InvalidOperationException($"Missing front matter: {path}");

    var end = text.IndexOf("\n---\n", 4, StringComparison.Ordinal);
    if (end < 0) throw new InvalidOperationException($"Invalid front matter: {path}");

    var frontMatter = text[4..end];
    var body = text[(end + 5)..].Trim();
    var meta = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

    foreach (var line in frontMatter.Split('\n'))
    {
        var separator = line.IndexOf(':');
        if (separator > 0)
            meta[line[..separator].Trim()] = line[(separator + 1)..].Trim().Trim('"', '\'');
    }

    string Get(string key) => meta.TryGetValue(key, out var value)
        ? value
        : throw new InvalidOperationException($"Missing {key}: {path}");

    var tags = meta.TryGetValue("tags", out var tagValue)
        ? tagValue.Trim('[', ']')
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(x => x.Trim('"', '\''))
            .ToArray()
        : Array.Empty<string>();

    return new ContentRecord(
        Get("kind"),
        Get("title"),
        Get("slug"),
        Get("summary"),
        DateOnly.Parse(Get("published")),
        tags,
        StripMarkdown(body));
}

static string StripMarkdown(string source) => source
    .Replace("```mermaid", "", StringComparison.Ordinal)
    .Replace("```", "", StringComparison.Ordinal)
    .Replace("**", "", StringComparison.Ordinal)
    .Replace("__", "", StringComparison.Ordinal)
    .Trim();

static void WriteStaticContentPages(string publicRoot, IEnumerable<ContentRecord> items, RuntimeVersion runtime)
{
    foreach (var item in items)
    {
        var dir = Path.Combine(publicRoot, "content", item.Slug);
        Directory.CreateDirectory(dir);
        var canonical = $"https://chicodotnet.github.io/content/{item.Slug}/";
        var schemaType = item.Kind == "video" ? "VideoObject" : "TechArticle";
        var tags = string.Join(", ", item.Tags);
        var tagHtml = string.Join("", item.Tags.Select(tag => $"<span class=\"badge\">{WebUtility.HtmlEncode(tag)}</span>"));
        var schema = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["@context"] = "https://schema.org",
            ["@type"] = schemaType,
            ["headline"] = item.Title,
            ["description"] = item.Summary,
            ["datePublished"] = item.Published.ToString("yyyy-MM-dd"),
            ["author"] = new Dictionary<string, string>
            {
                ["@type"] = "Person",
                ["name"] = "ChicoDotNet",
                ["url"] = "https://chicodotnet.github.io/"
            }
        });

        var html = $$"""
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{WebUtility.HtmlEncode(item.Title)}} — ChicoDotNet</title>
  <meta name="description" content="{{WebUtility.HtmlEncode(item.Summary)}}">
  <meta name="keywords" content="{{WebUtility.HtmlEncode(tags)}}">
  <meta name="author" content="ChicoDotNet">
  <link rel="canonical" href="{{canonical}}">
  <script type="application/ld+json">{{schema}}</script>
  <style>body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:780px;margin:0 auto;padding:48px 24px;color:#172033;line-height:1.65}a{color:#273cbe}.meta{color:#667085}.badge{display:inline-block;padding:4px 8px;border:1px solid #d0d5dd;border-radius:999px;margin:0 6px 6px 0}</style>
</head>
<body>
  <p><a href="/">← ChicoDotNet</a></p>
  <h1>{{WebUtility.HtmlEncode(item.Title)}}</h1>
  <p class="meta">{{WebUtility.HtmlEncode(item.Kind)}} · {{item.Published:yyyy-MM-dd}} · v{{WebUtility.HtmlEncode(runtime.Version)}}</p>
  <p>{{WebUtility.HtmlEncode(item.Summary)}}</p>
  <div>{{tagHtml}}</div>
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
            new XElement("description", "Notas de ingeniería, diagramas y videos de ChicoDotNet."),
            items.Where(x => x.Kind == "article").Select(x => new XElement("item",
                new XElement("title", x.Title),
                new XElement("link", $"https://chicodotnet.github.io/content/{x.Slug}/"),
                new XElement("guid", $"https://chicodotnet.github.io/content/{x.Slug}/"),
                new XElement("pubDate", x.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("R")),
                new XElement("description", x.Summary)))))).ToString();

static string BuildAtom(IEnumerable<ContentRecord> items)
{
    XNamespace atom = "http://www.w3.org/2005/Atom";
    var updated = items.Any()
        ? items.Max(x => x.Published).ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O")
        : DateTime.UnixEpoch.ToString("O");

    return new XDocument(new XElement(atom + "feed",
        new XElement(atom + "title", "ChicoDotNet"),
        new XElement(atom + "id", "https://chicodotnet.github.io/"),
        new XElement(atom + "updated", updated),
        items.Where(x => x.Kind == "article").Select(x => new XElement(atom + "entry",
            new XElement(atom + "title", x.Title),
            new XElement(atom + "id", $"https://chicodotnet.github.io/content/{x.Slug}/"),
            new XElement(atom + "updated", x.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O")),
            new XElement(atom + "summary", x.Summary))))).ToString();
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

static string BuildLlms(IEnumerable<ContentRecord> items, RuntimeVersion runtime)
{
    var builder = new StringBuilder();
    builder.AppendLine("# ChicoDotNet");
    builder.AppendLine($"> Public engineering home for ChicoDotNet. Release v{runtime.Version}.");
    builder.AppendLine();
    builder.AppendLine("Canonical language: Spanish. Supported interface locales: es, en, de, fr, it, pt-BR, ru, zh-Hans, ja.");
    builder.AppendLine();
    foreach (var item in items)
        builder.AppendLine($"- [{item.Kind}] [{item.Title}](https://chicodotnet.github.io/content/{item.Slug}/): {item.Summary}");
    return builder.ToString();
}

record ContentRecord(string Kind, string Title, string Slug, string Summary, DateOnly Published, string[] Tags, string Body);
record BaseVersion(string Version);
record RuntimeVersion(string Version, string BaseVersion, string ReleaseDateUtc, int Build, string Channel, string? CommitSha, string GeneratedUtc);
