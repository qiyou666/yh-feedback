# 将本库推到 GitHub（需已 gh auth login）
$ErrorActionPreference = "Stop"
$gh = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) { $gh = "gh" }

Set-Location $PSScriptRoot\..

& $gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host "请先登录： $gh auth login --with-token  < 你的PAT文件"
  Write-Host "或浏览器： $gh auth login -h github.com -p https -w"
  exit 1
}

$user = & $gh api user --jq .login
$name = "yh-feedback"
$desc = "UI/Feedback: lightweight Confirm Modal + Toast (vanilla JS, zero deps)"

# 若远程已存在则只推送
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  & $gh repo create $name --public --source=. --remote=origin --description $desc --push
} else {
  git push -u origin main
}

Write-Host "Done: https://github.com/$user/$name"
& $gh repo edit $name --add-topic ui --add-topic feedback --add-topic modal --add-topic toast --add-topic confirm-dialog --add-topic vanilla-js 2>$null
