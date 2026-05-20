# Connect the Little Lemon back-end to MySQL

> Create and connect to a MySQL database that can be used inside a Django project.

![Django](https://img.shields.io/badge/Django-4.2-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.4.3-green)

---

## 🎯 Objectives

- Create new MySQL database credentials

- Update the project settings in Django to enable connection with MySQL

- Migrate models and update the database table

Example:

This project is a real-time collaborative note-taking platform built for distributed teams.

## 📁 Repository Layout

```
myproject/
├── myapp/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── myproject/
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── pipfile
```

## Initial instructions

you are required to use the command line console inside the VS Code terminal.

If not open already, go to Terminal on the Menu bar at the top of your screen and select New Terminal.
New Terminal option inside the Terminal menu in VSCode

Before you begin this lab, you must activate the virtual environment.

```
py -m venv env
.\env\Scripts\activate
```

## Steps

### Step 1:

First go to the command line or terminal on your local machine and login to the mysql shell by typing the command:

```
mysql -u root -p
```

Press Enter and enter the password when prompted.

Note: Depending on the local machine, in some cases you may have to provide admin privileges for this command. This can be done by adding the keyword sudo before the command. For example:

```
sudo mysql -u root -p
```

### Step 2:

Create a database with the name reservations with the command below:

```
CREATE DATABASE reservations;
```

Note: The commands in MySQL should end with a semi-colon (;).

### Step 3:

Next, you need to verify that the database has been created by typing the command:

```
SHOW DATABASES;
```

The output will depend on the databases present on your local machine. Confirm that it includes the database you have created.

### Step 4:

Now open VS Code and open the Terminal inside it. Navigate to the project directory of your Django project and enable pipenv virtual environment for the project.

Note: Ensure the Pipfile created by pipenv command is updated with mysqlclient and Django package installations along with the other dependencies specific to your local machine, for running the project.

```
pip3 install django
pip install mysqlclient
```

### Step 5:

In the terminal, run the command that will enable access to mysql and enter the mysql shell by passing the -u and -p flags that will enable the MySQL console to prompt for a password.
Prompt requesting password after running command mysql -u root -p

Note: The default password set for mysql here should be the same as the one set for root user on your local machine.

### Step 6:

Run the command to show databases and ensure the reservations database you have created is present in the list of databases.

### Step 7:

Create a new user for the database by running the following command:

```
 CREATE USER 'admindjango'@'localhost' IDENTIFIED BY 'employee@123!';
```

### Step 8:

Run the following command to grant all permissions to the user you have created:

```
 GRANT ALL ON *.* TO 'admindjango'@'localhost';
Result of running query to grant all permissions to a user in MySQL
```

Note: The full privileges are assigned here, but it is not the ideal practice in production environments.

### Step 9:

Run the command to flush all the privileges.

Note: Privileges assigned using GRANT command do not require the flush privileges but it is usually a good practice to run this command while you are using variable commands for changing privileges and reloading the server and grant tables containing information about user accounts.

### Step 10:

Run the command to exit the mysql shell.

Note: Once inside the Django shell, make sure the pipenv virtual environment is still active. You can observe the round brackets such as (myproject) as a suffix inside your VS Code prompt.

### Step 11:

Inside your Django project, open the **settings.py** file and go to the INSTALLED_APPS configuration.

Add the name of your Django app myapp to the list.
Configuration for INSTALLED APPS inside the **settings.py** file in VSCode.

```
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',
]
```

Note: Make sure you add a comma(,) after the string.

### Step 12:

Now search for the configuration labeled DATABASES and update the configuration. Select the values assigned to it by default and replace them with the following code:
DATABASES configuration option under **settings.py** file

```
# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Step 13:

After you enter the values and your code is the same as seen in the screenshot above, replace the values for the following:

| Parameter | Value                      |
| --------- | -------------------------- |
| NAME:     | ‘reservations’             |
| USER:     | 'admindjango'              |
| PASSWORD: | 'employee@123!'            |
| ENGINE    | 'django.db.backends.mysql' |

it must look like this:

```
# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'reservations',
        'USER': 'admindjango',
        'PASSWORD': 'employee@123!',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

Save the settings.py file.

### Step 14:

In the Terminal, run the command to make migrations. Make sure you are inside the directory that contains manage.py file.

```
python manage.py makemigrations
python manage.py migrate

```

### Step 16:

Open the file **models.py** and take note of the code already added for creating a model named Booking.

### Step 17:

Run both of the commands to perform the migration.

The migrations will create the Booking table that can be seen from the MySQL extension installed inside your VS Code.

### Step 18:

Run the command to enter the mysql shell again and enter the credentials requested.

Once inside the mysql shell, run a command to see the Booking table you have created. You can do this by typing the command:

```
use reservations;
```

Add a second command next:

```
show tables;
```

You can observe all the different tables that Django created after the migrate command. The main table that you will be dealing with from the list is the myapp_booking.

To see the details of this table, type the command:

```
describe myapp_booking;
```

You will be able to note all the fields that have been added inside the table generated from the model.

Note: You will not see any entries in the table as it is empty and will need to be updated.
