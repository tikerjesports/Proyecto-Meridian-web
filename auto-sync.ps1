$dir = "C:\Users\marke\.gemini\antigravity\scratch\meridian-esports"
Set-Location $dir

Write-Host "Iniciando auto-guardado en GitHub cada 30 segundos..."
while ($true) {
    Start-Sleep -Seconds 30
    $status = git status --porcelain
    if ($status) {
        Write-Host "Cambiado detectado. Guardando..."
        git add .
        $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto-save: $date"
        git push
        Write-Host "¡Subido a GitHub correctamente a las $date!"
    }
}
