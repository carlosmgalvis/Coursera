# TDD / BDD Final Project Template

This repository contains the template to be used for the Final Project for the Coursera course **Introduction to TDD/BDD**.

## Usage

This repository is to be used as a template to create your own repository in your own GitHub account. No need to Fork it as it has been set up as a Template. This will avoid confusion when making Pull Requests in the future.

From the GitHub **Code** page, press the green **Use this template** button to create your own repository from this template.

Name your repo: `tdd-bdd-final-project`.

## Setup

After entering the lab environment you will need to run the `setup.sh` script in the `./bin` folder to install the prerequisite software if you´re working in linux.

```bash
bash bin/setup.sh
```

If you´re working in windows you must run

```bash
bin/setup.ps1
```

Then you must exit the shell and start a new one for the Python virtual environment to be activated.

```bash
exit
```

## Tasks

In this project you will use good Test Driven Development (TDD) and Behavior Driven Development (BDD) techniques to write TDD test cases, BDD scenarios, and code, updating the following files:

```bash
tests/test_models.py
tests/test_routes.py
service/routes.py
features/products.feature
features/steps/load_steps.py
```

You will be given partial implementations in each of these files to get you started. Use those implementations as examples of the code you should write.

## 📁 Files Structure

```
tdd-bdd-final-project/
├── bin/
│   ├── setup.ps1                           ##New
│   └── setup.sh
├── features/
│   ├── steps/
│   │   ├── load_steps.py                   ##Edit
│   │   └── web_steps.py                    ##Edit
│   ├── environment.py
│   └── products.feature                    ##Edit
├── service/
│   ├── commpon/
│   │   ├── __init__.py
│   │   ├── cli_commands.py
│   │   ├── error_handlers.py
│   │   ├── log_handlers.py
│   │   └── status.py
│   ├── static/
│   │   ├── css/
│   │   │   ├── blue_bootstrap.min.css
│   │   │   ├── cerulean_bootstrap.min.css
│   │   │   ├── darkly_bootstrap.min.css
│   │   │   ├── flatly_bootstrap.min.css
│   │   │   └── slate_bootstrap.min.css
│   │   ├── images/
│   │   │   └── newapp-icon.png
│   │   ├── js/
│   │   │   ├── bootstrap.min.js
│   │   │   ├── jquery-3.6.0.min.js
│   │   │   └── rest_api.js
│   │   └── index.html
│   ├── __init__.py
│   ├── config.py
│   ├── models.py
│   └── routes.py                           ##Edit
├── tests/
│   ├── __init__.py
│   ├── factories.py                        ##Edit
│   ├── test_cli_commands.py
│   ├── test_models.py                      ##Edit
│   └── test_routes.py                      ##Edit
├── .flaskenv
├── .gitattributes
├── .gitignore
├── Dockerfile
├── dot-env-example
├── LICENSE
├── Makefile
├── Procfile
├── README.md
├── requirements.txt
└── setup.cfg
```

## License

Licensed under the Apache License. See [LICENSE](/LICENSE)

## Author

John Rofrano, Senior Technical Staff Member, DevOps Champion, @ IBM Research

## <h3 align="center"> © IBM Corporation 2023. All rights reserved. <h3/>
