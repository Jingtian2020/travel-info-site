param(
  [string]$DataFile = "assets/data/travel-data.js"
)

$ErrorActionPreference = "Stop"

function Read-TravelData {
  param([string]$Path)

  $raw = Get-Content -Path $Path -Raw -Encoding UTF8
  $json = $raw -replace '^\s*window\.TRAVEL_DATA\s*=\s*', '' -replace ';\s*$', ''
  return $json | ConvertFrom-Json
}

function Write-TravelData {
  param(
    [object]$Data,
    [string]$Path
  )

  $json = $Data | ConvertTo-Json -Depth 20
  $wrapped = "window.TRAVEL_DATA = $json;"
  Set-Content -Path $Path -Value $wrapped -Encoding UTF8
}

function Build-GoogleNewsUrl {
  param([string]$Query)

  $encoded = [System.Uri]::EscapeDataString($Query)
  return "https://news.google.com/rss/search?q=$encoded&hl=en-US&gl=US&ceid=US:en"
}

function Get-NodeText {
  param([object]$Node)

  if ($null -eq $Node) {
    return ""
  }

  if ($Node -is [string]) {
    return $Node
  }

  if ($Node.PSObject.Properties.Match('#text').Count -gt 0) {
    return [string]$Node.'#text'
  }

  return [string]$Node
}

function Strip-Html {
  param([string]$Text)

  if ([string]::IsNullOrWhiteSpace($Text)) {
    return ""
  }

  return ($Text -replace '<[^>]+>', ' ' -replace '\s+', ' ').Trim()
}

function Get-SourceName {
  param([string]$Link)

  try {
    $uri = [System.Uri]$Link
    $host = $uri.Host -replace '^www\.', ''
    return $host
  }
  catch {
    return "news"
  }
}

function Get-RegionTag {
  param([string]$Text)

  $samples = @{
    "新加坡" = @("singapore", "mandai")
    "日本" = @("japan", "tokyo", "kyoto", "osaka")
    "中国香港" = @("hong kong")
    "中国台湾" = @("taiwan", "taipei", "taichung")
    "美国" = @("new york", "las vegas", "washington", "los angeles", "florida", "philadelphia", "miami")
    "欧洲" = @("europe", "spain", "italy", "portugal", "turkey", "iceland")
  }

  $lower = $Text.ToLowerInvariant()

  foreach ($region in $samples.Keys) {
    foreach ($keyword in $samples[$region]) {
      if ($lower.Contains($keyword)) {
        return $region
      }
    }
  }

  return "全球"
}

function Get-Tags {
  param([string]$Text)

  $tags = New-Object System.Collections.Generic.List[string]
  $lower = $Text.ToLowerInvariant()

  if ($lower -match 'museum|gallery|art|exhibit') { $tags.Add("城市文化") }
  if ($lower -match 'hotel|resort') { $tags.Add("酒店上新") }
  if ($lower -match 'immersive|experience|interactive') { $tags.Add("沉浸体验") }
  if ($lower -match 'wildlife|park|nature|zoo|outdoor') { $tags.Add("自然户外") }
  if ($lower -match 'sport|pickleball|stadium') { $tags.Add("运动社交") }

  if ($tags.Count -eq 0) {
    $tags.Add("新体验")
  }

  return $tags | Select-Object -Unique
}

function Get-Freshness {
  param([datetime]$PublishedAt)

  $today = Get-Date
  $days = ($today - $PublishedAt).Days

  if ($days -le 14) { return "刚更新" }
  if ($days -le 45) { return "近期上新" }
  return "近月动态"
}

function ConvertTo-LaunchItem {
  param(
    [object]$Item,
    [string]$BucketName
  )

  $title = (Get-NodeText $Item.title).ToString()
  $description = Strip-Html ((Get-NodeText $Item.description).ToString())
  $link = (Get-NodeText $Item.link).ToString()
  $pubDate = Get-Date ((Get-NodeText $Item.pubDate).ToString())
  $sourceText = Get-NodeText $Item.source
  $source = if ($sourceText) { $sourceText } else { Get-SourceName $link }
  $region = Get-RegionTag "$title $description"
  $tags = Get-Tags "$title $description"
  $summary = if ($description) {
    $description.Substring(0, [Math]::Min($description.Length, 110)).Trim()
  }
  else {
    "公开资讯显示该项目近期有新开放、焕新或新体验动态。"
  }

  return [PSCustomObject]@{
    id = ($title.ToLowerInvariant() -replace '[^a-z0-9]+', '-' -replace '(^-|-$)', '')
    title = $title
    location = $region
    freshness = Get-Freshness $pubDate
    summary = $summary
    whyItMatters = "来自公开资讯源的近期动态，适合作为下一次出游或持续关注的备选灵感。"
    tags = $tags
    sourceName = $source
    sourceUrl = $link
    publishedAt = $pubDate.ToString("yyyy-MM-dd")
    bucket = $BucketName
  }
}

function Get-FeedItems {
  param(
    [string]$Query,
    [string]$BucketName,
    [int]$Take = 6
  )

  $url = Build-GoogleNewsUrl $Query
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
  [xml]$xml = $response.Content
  $items = @($xml.rss.channel.item)

  return $items |
    Select-Object -First $Take |
    ForEach-Object { ConvertTo-LaunchItem -Item $_ -BucketName $BucketName }
}

function Select-RandomSubset {
  param(
    [object[]]$Items,
    [int]$Count
  )

  if (-not $Items -or $Items.Count -eq 0) {
    return @()
  }

  $actual = [Math]::Min($Count, $Items.Count)
  return $Items | Get-Random -Count $actual
}

$data = Read-TravelData -Path $DataFile

$queries = @(
  @{ Query = '"new attraction" OR "new immersive experience" travel when:120d'; Bucket = 'recent-launch' },
  @{ Query = '"new museum" OR "museum expansion" travel when:120d'; Bucket = 'recent-culture' },
  @{ Query = '"new resort" OR "new hotel" travel when:120d'; Bucket = 'recent-stay' }
)

$aggregated = New-Object System.Collections.Generic.List[object]

foreach ($entry in $queries) {
  try {
    $items = Get-FeedItems -Query $entry.Query -BucketName $entry.Bucket -Take 5
    foreach ($item in $items) {
      $aggregated.Add($item)
    }
  }
  catch {
    Write-Warning "Failed to refresh query '$($entry.Query)': $($_.Exception.Message)"
  }
}

if ($aggregated.Count -ge 4) {
  $recentItems = $aggregated |
    Sort-Object publishedAt -Descending |
    Group-Object title |
    ForEach-Object { $_.Group[0] } |
    Select-Object -First 9

  $data.recentLaunches = @($recentItems)
}
else {
  Write-Warning "Not enough fresh feed items were collected. Keeping existing recent launches."
}

$data.classicPicks = @(Select-RandomSubset -Items @($data.classicLibrary) -Count 4)
$data.playModes = @(Select-RandomSubset -Items @($data.playbookLibrary) -Count 6)
$data.trendSignals = @(Select-RandomSubset -Items @($data.trendSignals) -Count ([Math]::Min(4, @($data.trendSignals).Count)))
$data.site.lastUpdated = (Get-Date).ToString("yyyy-MM-dd")

Write-TravelData -Data $data -Path $DataFile
Write-Host "Travel data refresh completed."
