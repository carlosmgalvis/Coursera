# setup.ps1
Write-Host "**************************************************"
Write-Host " Setting up CI/CD Final Project Environment"
Write-Host "**************************************************"

Write-Host "*** Checking for Python 3.14 installation"
$pythonInstalled = $false
try {
    $pythonVersion = python3 --version 2>&1
    if ($pythonVersion -match "3.14") {
        $pythonInstalled = $true
        Write-Host "Python 3.14 is already installed"
    }
}
catch {
    Write-Host "Python 3.14 not found. Installing..."
}

if (-not $pythonInstalled) {
    Write-Host "*** Installing Python 3.14 using winget (Windows Package Manager)"
    # Try winget (Windows 10/11)
    try {
        winget install Python.Python.3.14 --silent
        Write-Host "Python 3.14 installed via winget"
    }
    catch {
        Write-Host "winget not available. Please install Python 3.14 manually from https://www.python.org/downloads/"
        Write-Host "Make sure to check 'Add Python to PATH' during installation"
        exit 1
    }
}

Write-Host "*** Checking the Python version..."
python --version

Write-Host "*** Creating a Python virtual environment"
python -m venv $env:USERPROFILE\venv

Write-Host "*** Activating virtual environment and installing dependencies"
# Activate virtual environment
& "$env:USERPROFILE\venv\Scripts\Activate.ps1"

Write-Host "*** Upgrading pip and wheel"
python -m pip install --upgrade pip wheel

Write-Host "*** Installing Selenium and Chrome for BDD"
# Check if Chrome is installed
$chromeInstalled = $false
try {
    $chromePath = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" -ErrorAction SilentlyContinue
    if ($chromePath) {
        $chromeInstalled = $true
        Write-Host "Google Chrome is installed"
    }
}
catch {
    Write-Host "Google Chrome not found. Installing Chrome..."
}

if (-not $chromeInstalled) {
    Write-Host "*** Downloading and installing Google Chrome..."
    $chromeInstaller = "$env:TEMP\chrome_installer.exe"
    Invoke-WebRequest -Uri "https://dl.google.com/chrome/install/latest/chrome_installer.exe" -OutFile $chromeInstaller
    Start-Process -FilePath $chromeInstaller -ArgumentList "/silent /install" -Wait
    Remove-Item $chromeInstaller
}

# Install Selenium and other dependencies
Write-Host "*** Installing Python dependencies..."
# Check if requirements.txt exists
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
}
else {
    Write-Host "requirements.txt not found. Installing Selenium directly..."
    pip install selenium
}

Write-Host "*** Configuring the developer environment..."
# Add environment variables to user profile
$profileContent = @"
# CI/CD Final Project additions
`$env:GITHUB_ACCOUNT = `$env:GITHUB_ACCOUNT
# Activate virtual environment by default
& `$env:USERPROFILE\venv\Scripts\Activate.ps1
"@

# Add to PowerShell profile if it doesn't exist
if (-not (Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -ItemType File -Force
}
Add-Content -Path $PROFILE -Value $profileContent

Write-Host "**************************************************"
Write-Host " CI/CD Final Project Environment Setup Complete"
Write-Host "**************************************************"
Write-Host ""
Write-Host "Please restart your PowerShell terminal or run:"
Write-Host "& `$env:USERPROFILE\venv\Scripts\Activate.ps1"
Write-Host ""
Write-Host "Note: The virtual environment is set to activate automatically"
Write-Host "when you start PowerShell (if you have the profile configured)."
Write-Host ""
Write-Host "To manually activate the virtual environment, run:"
Write-Host ". `$env:USERPROFILE\venv\Scripts\Activate.ps1"