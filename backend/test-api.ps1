# Test script to seed -> get -> put -> get -> delete -> get
# Run from backend folder: .\test-api.ps1

$base = 'http://localhost:3000/api'

Write-Host "Seeding users..."
$seed = Invoke-RestMethod -Method Post -Uri "$base/users/seed"
$seed | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "GET in-memory"
$inmem = Invoke-RestMethod -Method Get -Uri "$base/users/in-memory"
$inmem | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "PUT u1 -> update name/email"
$body = @{ name = 'Nguyen Scripted'; email = 'scripted@example.com' } | ConvertTo-Json
try {
    $put = Invoke-RestMethod -Method Put -Uri "$base/users/u1" -Body $body -ContentType 'application/json'
    $put | ConvertTo-Json -Depth 5 | Write-Host
} catch {
    Write-Host "PUT failed:" $_.Exception.Message
}

Write-Host "GET in-memory after PUT"
$inmem2 = Invoke-RestMethod -Method Get -Uri "$base/users/in-memory"
$inmem2 | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "DELETE u2"
try {
    $del = Invoke-RestMethod -Method Delete -Uri "$base/users/u2"
    $del | ConvertTo-Json -Depth 5 | Write-Host
} catch {
    Write-Host "DELETE failed:" $_.Exception.Message
}

Write-Host "GET in-memory after DELETE"
$inmem3 = Invoke-RestMethod -Method Get -Uri "$base/users/in-memory"
$inmem3 | ConvertTo-Json -Depth 5 | Write-Host
