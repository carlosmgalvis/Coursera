Write-Host "**************************************************"
Write-Host " Setting up TDD/BDD Final Project Environment (Windows 11)"
Write-Host "**************************************************"

Write-Host "*** Installing Python 3.11 (via winget)"
winget install --id Python.Python.3.11 --silent

Write-Host "*** Checking Python version..."
python --version

Write-Host "*** Creating Python virtual environment"
& "C:\Users\PC\AppData\Local\Programs\Python\Python311\python.exe" -m venv "C:\Users\PC\Documents\GitHub\Coursera\Tdd\tdd-bdd-final-project\venv"

Write-Host "*** Activating virtual environment"
$venvPath = "C:\Users\PC\Documents\GitHub\Coursera\Tdd\tdd-bdd-final-project\venv\Scripts\Activate.ps1"
& $venvPath

Write-Host "*** Installing Python dependencies"
python -m pip install --upgrade pip wheel
pip install -r requirements.txt

Write-Host "*** Installing Selenium WebDriver"
pip install selenium

Write-Host "*** Installing Chrome and ChromeDriver"
winget install --id Google.Chrome --silent
winget install --id Chromium.ChromeDriver --silent

Write-Host "*** Creating .env file"
Copy-Item -Path "dot-env-example" -Destination ".env" -Force

Write-Host "*** Starting Postgres Docker container"
docker-compose up -d db

Write-Host "*** Checking Docker containers"
docker ps

Write-Host "**************************************************"
Write-Host " TDD/BDD Final Project Environment Setup Complete"
Write-Host "**************************************************"
Write-Host ""
Write-Host "Close this terminal and open a new one to initialize the environment."
Write-Host ""
