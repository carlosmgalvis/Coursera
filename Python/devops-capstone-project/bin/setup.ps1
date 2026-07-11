Write-Host "****************************************"
Write-Host " Setting up Capstone Environment"
Write-Host "****************************************"

Write-Host "`nInstalling Python 3.9..."
# Download Python 3.9 installer
$pythonInstaller = "$env:TEMP\python39-installer.exe"
Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.9.13/python-3.9.13-amd64.exe" -OutFile $pythonInstaller

# Install Python silently
Start-Process -FilePath $pythonInstaller -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1" -Wait

Write-Host "`nChecking Python version..."
python --version

Write-Host "`nCreating Python virtual environment..."
$venvPath = "$HOME\venv"
python3.9 -m venv $venvPath

Write-Host "`nActivating virtual environment and upgrading pip..."
& "$venvPath\Scripts\Activate.ps1"
python -m pip install --upgrade pip wheel

Write-Host "`nInstalling Python dependencies..."
pip install -r requirements.txt

Write-Host "`nConfiguring developer environment..."
$profileEntry = @"
# DevOps Capstone Project additions
`$env:GITHUB_ACCOUNT = "$env:GITHUB_ACCOUNT"
& "$venvPath\Scripts\Activate.ps1"
"@

Add-Content -Path $PROFILE -Value $profileEntry

Write-Host "`nStarting the Postgres Docker container..."
docker-compose run --rm db

Write-Host "`nChecking Docker containers..."
docker ps

Write-Host "****************************************"
Write-Host " Capstone Environment Setup Complete"
Write-Host "****************************************"
Write-Host "`nClose this terminal and open a new one to initialize the environment.`n"
