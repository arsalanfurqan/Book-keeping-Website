param([string]$ArchiveName = ('Ledgerlyapps-handoff-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip'))
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$qaRoot = Join-Path $projectRoot '.qa'
New-Item -ItemType Directory -Path $qaRoot -Force | Out-Null
$archivePath = [IO.Path]::GetFullPath((Join-Path $qaRoot $ArchiveName))
if (!$archivePath.StartsWith($qaRoot + '\', [StringComparison]::OrdinalIgnoreCase) -or [IO.Path]::GetExtension($archivePath) -ne '.zip') { throw 'Archive must be a ZIP inside the project .qa directory.' }
if (Test-Path -LiteralPath $archivePath) { throw 'Archive already exists; choose a new ArchiveName.' }
if (!(Test-Path -LiteralPath (Join-Path $projectRoot 'dist/index.html'))) { throw 'Run npm run build first.' }
$include = @('dist','src','public','server','shared','scripts','tests','deploy','package.json','package-lock.json','README.md','.env.example','vite.config.js','Dockerfile','compose.yaml')
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::Open($archivePath, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($item in $include) {
    $source = Get-Item -LiteralPath (Join-Path $projectRoot $item)
    $files = if ($source.PSIsContainer) { Get-ChildItem -LiteralPath $source.FullName -File -Recurse -Force } else { @($source) }
    foreach ($file in $files) {
      if ($file.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Linked files are not included in release archives.' }
      if (!$file.FullName.StartsWith($projectRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'File outside project.' }
      $relative = $file.FullName.Substring($projectRoot.Length + 1).Replace('\','/')
      if ($relative -match '(^|/)(\.git|node_modules|backups|\.qa)/|(^|/)\.env$') { throw 'Private file in release inputs.' }
      [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relative, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
  }
} finally { $archive.Dispose() }
$check = [IO.Compression.ZipFile]::OpenRead($archivePath)
try {
  foreach ($required in @('dist/index.html','server/index.mjs','deploy/HANDOFF.md','.env.example')) {
    if (!$check.GetEntry($required)) { throw "Archive is missing $required" }
  }
  Write-Output "Verified $($check.Entries.Count) archive entries."
} finally { $check.Dispose() }
Get-Item -LiteralPath $archivePath | Select-Object FullName,Length | ConvertTo-Json
