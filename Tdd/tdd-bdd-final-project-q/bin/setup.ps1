Write-Host "**************************************************"
Write-Host " Setting up TDD/BDD Final Project Environment"
Write-Host "**************************************************"

Write-Host "*** Installing Node.js 18 and npm"

# Install Node.js 18 using winget
Write-Host "*** Installing Node.js 18 via winget..."
winget install -e --id OpenJS.NodeJS.LTS

Write-Host "*** Checking Node.js and npm versions..."
node --version
npm --version

Write-Host "*** Installing project dependencies..."
npm install

Write-Host "*** Installing global development tools..."
npm install -g nodemon

Write-Host "*** Installing Selenium and Firefox for BDD"

# Install Firefox
Write-Host "*** Installing Firefox..."
winget install -e --id Mozilla.Firefox

# Install SQLite
Write-Host "*** Installing SQLite..."
winget install -e --id SQLite.SQLite

# Install curl (if missing)
Write-Host "*** Ensuring curl is installed..."
winget install -e --id Curl.Curl

# Install Geckodriver
Write-Host "*** Installing geckodriver..."

$releaseInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/mozilla/geckodriver/releases/latest"
$version = $releaseInfo.tag_name
$zipUrl = "https://github.com/mozilla/geckodriver/releases/download/$version/geckodriver-$version-win64.zip"

Write-Host "*** Downloading geckodriver $version..."
Invoke-WebRequest -Uri $zipUrl -OutFile "$env:TEMP\geckodriver.zip"

Write-Host "*** Extracting geckodriver..."
Expand-Archive "$env:TEMP\geckodriver.zip" -DestinationPath "C:\Tools\Geckodriver" -Force

# Add to PATH if not already present
$geckoPath = "C:\Tools\Geckodriver"
if (-not ($env:Path -like "*$geckoPath*")) {
    Write-Host "*** Adding Geckodriver to PATH..."
    setx PATH "$($env:Path);$geckoPath"
}

Remove-Item "$env:TEMP\geckodriver.zip"

Write-Host "*** Establishing .env file"
Copy-Item ".env.example" ".env" -Force

Write-Host "*** Starting the PostgreSQL Docker container..."

# Check Docker availability
if (Get-Command docker -ErrorAction SilentlyContinue) {

    Write-Host "*** Docker detected"

    # Stop and remove existing container
    docker stop postgres 2>$null
    docker rm postgres 2>$null

    Write-Host "*** Running new PostgreSQL container..."
    docker run -d --name postgres `
        -p 5432:5432 `
        -e POSTGRES_PASSWORD=postgres `
        -v postgres_data:/var/lib/postgresql/data `
        postgres:13-alpine

    Write-Host "*** Waiting for PostgreSQL to start..."
    Start-Sleep -Seconds 10

    Write-Host "*** Checking PostgreSQL container..."
    docker ps | Select-String "postgres"

} else {
    Write-Host "*** Docker not available, please ensure PostgreSQL is running on localhost:5432"
}

Write-Host "**************************************************"
Write-Host " TDD/BDD Final Project Environment Setup Complete"
Write-Host "**************************************************"
Write-Host ""
Write-Host "Close this terminal and open a new one to refresh PATH"
Write-Host ""
