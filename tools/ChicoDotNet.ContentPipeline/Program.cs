using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml.Linq;

var root = FindRoot(Directory.GetCurrentDirectory());
var contentRoot = Path.Combine(root, "content");
var publicRoot = Path.Combine(root, "public");
var json = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};

var baseVersion = JsonSerializer.Deserialize<BaseVersion>(
    File.ReadAllText(Path.Combine(root, "version.json")), json)
    ?? throw new InvalidOperationException("version.json is invalid.");

if (string.IsNullOrWhiteSpace(baseVersion.Version) ||
    !Regex.IsMatch(baseVersion.Version, @"^\d+\.\d+$"))
    throw new InvalidOperationException("version.json must contain major.minor, for example 0.1.");

var nowUtc = DateTimeOffset.UtcNow;
var dateCode = Environment.GetEnvironmentVariable("RELEASE_DATE_UTC") ?? nowUtc.ToString("yyMMdd");
if (!Regex.IsMatch(dateCode, @"^\d{6}$"))
    throw new InvalidOperationException("RELEASE_DATE_UTC must use yyMMdd in UTC.");

var buildText = Environment.GetEnvironmentVariable("RELEASE_BUILD") ?? "0";
if (!int.TryParse(buildText, out var build) || build < 0)
    throw new InvalidOperationException("RELEASE_BUILD must be a non-negative integer.");

var runtime = new RuntimeVersion(
    Version: $"{baseVersion.Version}.{dateCode}.{build:D3}",
    BaseVersion: baseVersion.Version,
    ReleaseDateUtc: dateCode,
    Build: build,
    Channel: Environment.GetEnvironmentVariable("RELEASE_CHANNEL") ?? "dev",
    CommitSha: Environment.GetEnvironmentVariable("GITHUB_SHA"),
    GeneratedUtc: nowUtc.ToString("O"));

var items = Directory.EnumerateFiles(contentRoot, "*.md", SearchOption.AllDirectories)
    .Select(ReadItem)
    .OrderByDescending(item => item.Published)
    .ToArray();

Directory.CreateDirectory(Path.Combine(publicRoot, "generated"));
File.WriteAllText(Path.Combine(publicRoot, "version.json"), JsonSerializer.Serialize(runtime, json));
File.WriteAllText(Path.Combine(publicRoot, "generated", "content-index.json"), JsonSerializer.Serialize(items, json));
File.WriteAllText(Path.Combine(publicRoot, "rss.xml"), BuildRss(items));
File.WriteAllText(Path.Combine(publicRoot, "atom.xml"), BuildAtom(items));
File.WriteAllText(Path.Combine(publicRoot, "sitemap.xml"), BuildSitemap(items));
File.WriteAllText(Path.Combine(publicRoot, "llms.txt"), BuildLlms(items, runtime));
WriteStaticContentPages(publicRoot, items, runtime);

Console.WriteLine($"Generated {items.Length} content records for v{runtime.Version} ({runtime.Channel}).");

static string FindRoot(string start)
{
    for (var current = new DirectoryInfo(start); current is not null; current = current.Parent)
        if (File.Exists(Path.Combine(current.FullName, "version.json")))
            return current.FullName;

    throw new DirectoryNotFoundException("Repository root not found.");
}

static ContentRecord ReadItem(string path)
{
    var text = File.ReadAllText(path).Replace("\r\n", "\n");
    if (!text.StartsWith("---\n", StringComparison.Ordinal))
        throw new InvalidOperationException($"Missing front matter: {path}");

    var end = text.IndexOf("\n---\n", 4, StringComparison.Ordinal);
    if (end < 0) throw new InvalidOperationException($"Invalid front matter: {path}");

    var meta = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
    foreach (var line in text[4..end].Split('\n'))
    {
        var separator = line.IndexOf(':');
        if (separator > 0)
            meta[line[..separator].Trim()] = line[(separator + 1)..].Trim().Trim('"', '\'');
    }

    string Required(string key) => meta.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value)
        ? value
        : throw new InvalidOperationException($"Missing {key}: {path}");

    var tags = meta.TryGetValue("tags", out var rawTags)
        ? rawTags.Trim('[', ']').Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(tag => tag.Trim('"', '\'')).ToArray()
        : Array.Empty<string>();

    return new ContentRecord(
        Required("kind"),
        Required("title"),
        Required("slug"),
        Required("summary"),
        DateOnly.Parse(Required("published")),
        tags,
        text[(end + 5)..].Trim());
}

static void WriteStaticContentPages(string publicRoot, IEnumerable<ContentRecord> items, RuntimeVersion runtime)
{
    foreach (var item in items)
    {
        var directory = Path.Combine(publicRoot, "content", item.Slug);
        Directory.CreateDirectory(directory);
        var canonical = $"https://chicodotnet.github.io/content/{item.Slug}/";
        var tags = string.Join(", ", item.Tags);
        var schema = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["@context"] = "https://schema.org",
            ["@type"] = item.Kind == "video" ? "VideoObject" : "TechArticle",
            ["headline"] = item.Title,
            ["description"] = item.Summary,
            ["datePublished"] = item.Published.ToString("yyyy-MM-dd"),
            ["author"] = new Dictionary<string, string>
            {
                ["@type"] = "Person",
                ["name"] = "Alfonso Lara Ramos",
                ["url"] = "https://chicodotnet.github.io/"
            }
        });

        var html = new StringBuilder()
            .AppendLine("<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\">")
            .AppendLine("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">")
            .AppendLine($"<title>{WebUtility.HtmlEncode(item.Title)} — ChicoDotNet</title>")
            .AppendLine($"<meta name=\"description\" content=\"{WebUtility.HtmlEncode(item.Summary)}\">")
            .AppendLine($"<meta name=\"keywords\" content=\"{WebUtility.HtmlEncode(tags)}\">")
            .AppendLine($"<link rel=\"canonical\" href=\"{canonical}\">")
            .AppendLine($"<script type=\"application/ld+json\">{schema}</script>")
            .AppendLine("<style>body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:780px;margin:0 auto;padding:48px 24px;color:#172033;line-height:1.65}a{color:#273cbe}.meta{color:#667085}.badge{display:inline-block;padding:4px 8px;border:1px solid #d0d5dd;border-radius:999px;margin:0 6px 6px 0}pre{white-space:pre-wrap;font:inherit}</style></head><body>")
            .AppendLine("<p><a href=\"/\">← ChicoDotNet</a></p>")
            .AppendLine($"<h1>{WebUtility.HtmlEncode(item.Title)}</h1>")
            .AppendLine($"<p class=\"meta\">{item.Kind} · {item.Published:yyyy-MM-dd} · v{WebUtility.HtmlEncode(runtime.Version)}</p>")
            .AppendLine($"<p>{WebUtility.HtmlEncode(item.Summary)}</p>")
            .AppendLine($"<p>{string.Join("", item.Tags.Select(tag => $"<span class=\"badge\">{WebUtility.HtmlEncode(tag)}</span>"))}</p>")
            .AppendLine($"<pre>{WebUtility.HtmlEncode(item.Body)}</pre>")
            .AppendLine("</body></html>")
            .ToString();

        File.WriteAllText(Path.Combine(directory, "index.html"), html);
    }
}

static string BuildRss(IEnumerable<ContentRecord> items) => new XDocument(
    new XElement("rss", new XAttribute("version", "2.0"),
        new XElement("channel",
            new XElement("title", "ChicoDotNet"),
            new XElement("link", "https://chicodotnet.github.io/"),
            new XElement("description", "Engineering notes, diagrams and videos from ChicoDotNet."),
            items.Where(item => item.Kind == "article").Select(item => new XElement("item",
                new XElement("title", item.Title),
                new XElement("link", $"https://chicodotnet.github.io/content/{item.Slug}/"),
                new XElement("guid", $"https://chicodotnet.github.io/content/{item.Slug}/"),
                new XElement("pubDate", item.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("R")),
                new XElement("description", item.Summary)))))).ToString();

static string BuildAtom(IEnumerable<ContentRecord> items)
{
    XNamespace atom = "http://www.w3.org/2005/Atom";
    var entries = items.Where(item => item.Kind == "article").ToArray();
    var updated = entries.Length == 0
        ? DateTime.UnixEpoch.ToString("O")
        : entries.Max(item => item.Published).ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O");

    return new XDocument(new XElement(atom + "feed",
        new XElement(atom + "title", "ChicoDotNet"),
        new XElement(atom + "id", "https://chicodotnet.github.io/"),
        new XElement(atom + "updated", updated),
        entries.Select(item => new XElement(atom + "entry",
            new XElement(atom + "title", item.Title),
            new XElement(atom + "id", $"https://chicodotnet.github.io/content/{item.Slug}/"),
            new XElement(atom + "updated", item.Published.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).ToString("O")),
            new XElement(atom + "summary", item.Summary))))).ToString();
}

static string BuildSitemap(IEnumerable<ContentRecord> items)
{
    XNamespace sitemap = "http://www.sitemaps.org/schemas/sitemap/0.9";
    return new XDocument(new XElement(sitemap + "urlset",
        new XElement(sitemap + "url", new XElement(sitemap + "loc", "https://chicodotnet.github.io/")),
        items.Select(item => new XElement(sitemap + "url",
            new XElement(sitemap + "loc", $"https://chicodotnet.github.io/content/{item.Slug}/"),
            new XElement(sitemap + "lastmod", item.Published.ToString("yyyy-MM-dd")))))).ToString();
}

static string BuildLlms(IEnumerable<ContentRecord> items, RuntimeVersion runtime)
{
    var output = new StringBuilder()
        .AppendLine("# ChicoDotNet")
        .AppendLine($"> Public engineering home for Alfonso Lara Ramos. Release v{runtime.Version}.")
        .AppendLine();

    foreach (var item in items)
        output.AppendLine($"- [{item.Kind}] [{item.Title}](https://chicodotnet.github.io/content/{item.Slug}/): {item.Summary}");

    return output.ToString();
}

record ContentRecord(string Kind, string Title, string Slug, string Summary, DateOnly Published, string[] Tags, string Body);
record BaseVersion(string Version);
record RuntimeVersion(string Version, string BaseVersion, string ReleaseDateUtc, int Build, string Channel, string? CommitSha, string GeneratedUtc);
