# TDD / BDD Final Project Template

This repository contains a fork of the template https://github.com/ibm-developer-skills-network/geakt-tdd-bdd-final-project-template-q to be used for the Final Project for the Coursera course **Introduction to TDD/BDD**.

![NodeJS](https://img.shields.io/badge/NodeJS-18.x-blue)

## Usage

This repository is the development of my own repository in my own GitHub account.

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
features/step_definitions/load_steps.js
features/step_definitions/web_steps.js
features/products.feature
src/routes/products.js
tests/routes/product.test.js
tests/models/product.test.js
tests/factories.js
```

You will be given partial implementations in each of these files to get you started. Use those implementations as examples of the code you should write.

## 📁 Files Structure

```
tdd-bdd-final-project/
├── bin/
│   ├── setup.ps1                           ##New
│   └── setup.sh
├── features/
│   ├── step_definitions/
│   │   ├── load_steps.js                   ##Edit
│   │   └── web_steps.js                    ##Edit
│   ├── support/
│   │   └── world.js
│   └── products.feature                    ##Edit
├── public/
│   ├── css/
│   │   ├── blue_bootstrap.min.css
│   │   ├── cerulean_bootstrap.min.css
│   │   ├── darkly_bootstrap.min.css
│   │   ├── flatly_bootstrap.min.css
│   │   └── slate_bootstrap.min.css
│   ├── js/
│   │   ├── bootstrap.min.js
│   │   ├── jquery-3.6.0.min.js
│   │   └── rest_api.js
│   └── index.html
├── src/
│   ├── database/
│   │   ├── connection.js
│   │   └── migrate.js
│   ├── middleware/
│   │   └── validation.js
│   ├── models/
│   │   └── product.js
│   ├── routes/
│   │   └── product.js                      ##Edit
│   └── app.js
├── tests/
│   ├── models/
│   │   └── product.test.js                 ##Edit
│   ├── routes/
│   │   └── product.test.js                 ##Edit
│   ├── factories.js                        ##Edit
│   └── setup.js
├── .env
├── .env.example
├── .eslintrc.js
├── .gitignore
├── cucumber.js
├── Makefile
├── package.json
└── README.md
```
