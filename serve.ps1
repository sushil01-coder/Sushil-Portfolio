Set-Location $PSScriptRoot
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://127.0.0.1:3000/')
$listener.Start()

while ($true) {
  $context = $listener.GetContext()
  $requestedPath = $context.Request.Url.LocalPath
  $relativePath = $requestedPath.TrimStart('/')
  if ([string]::IsNullOrWhiteSpace($relativePath)) {
    $relativePath = 'index.html'
  }

  $fullPath = Join-Path (Get-Location) $relativePath

  if (Test-Path $fullPath -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $extension = [System.IO.Path]::GetExtension($fullPath)
    switch ($extension) {
      '.html' { $contentType = 'text/html; charset=utf-8' }
      '.css' { $contentType = 'text/css; charset=utf-8' }
      '.js' { $contentType = 'application/javascript; charset=utf-8' }
      default { $contentType = 'application/octet-stream' }
    }

    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  }
  else {
    $context.Response.StatusCode = 404
    $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
    $context.Response.ContentLength64 = $body.Length
    $context.Response.OutputStream.Write($body, 0, $body.Length)
  }

  $context.Response.Close()
}
