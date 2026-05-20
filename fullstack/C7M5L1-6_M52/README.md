# Set up a Little Lemon booking API

> Set up an API endpoint to send form data to a MySQL database and return a JSON object to be displayed on the web page.

![Django](https://img.shields.io/badge/Django-4.2-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.4.3-green)

---

## 🎯 Objectives

- Create a view to process form data entered in a Django template

- Convert form data received from a POST method into a JSON object and return to a web page

## 📁 Repository Layout

```
myproject/
├── littlelemon/
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── restaurant/
│   ├── migrations/
│   ├── static/
|   │   ├── css/
|   |   │   └── style.css
|   │   ├── img/
|   |   │   └── menu_items/
│   ├── templates/
|   │   ├── partials/
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
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

Run the following command to activate the virtual environment:

```
pipenv shell
```

Note: Make sure you run the command in the main working directory containing the manage.py file.

### Step 2:

To make sure you have the necessary dependencies in place, run the following commands inside pipenv:

```
pipenv install django

pipenv install mysqlclient
```

Note: If you are facing problems with using the virtual environment, you can try running the project without using pipenv.

### Step 3:

Create a file in the restaurant directory called forms.py and import the following:

    - The Booking model from the file models.py.

    - The module forms from the package django

### Step 4:

Still inside the forms.py file, create a class called BookingForm and pass the forms.ModelForm as an argument to it.

### Step 5:

Inside the class BookingForm, create another class called Meta and declare the following attributes inside it:

    - Model with the value Booking

    - Field with the value "__all__"

### Step 6:

In the terminal run both commands to perform the migrations.

Note: Make sure you have created the correct MySQL user, assigned privileges, and configured the same database before you perform the migrations.

Run the necessary commands to make sure the user is created and can access the database.

### Step 7:

Open the file views.py and observe the code present inside it for the different views on the Little Lemon website. This was part of the functionality that was added using just the Django framework.

Remove the comments for the book() view function.

Also remove the commenting for the import statement below:

```
# from .forms import BookingForm
```

Observe the book() function that contains the functionality to accept the values added inside the form rendered on the page book.html.

Note: The necessary imports are already added inside the views.py file.

### Step 8:

Create a view function called bookings() and pass the request object to it as an argument. Follow the pseudo code below to add the necessary code for processing the form data.

Inside the bookings() view function, add the following pseudo code:

- Create a variable called date and assign it the following value:
  - request.GET.get('date',datetime.today().date())

- Create a variable called bookings and assign it the following value:
  - Call objects.all() on the Booking class object.

- Create a variable called booking_json and assign it the following value:
  - serialize() function called over serializers. Pass the following arguments to the - serialize() function
    - ‘json’
    - bookings

- Return the render() function and pass the following arguments to it:
  - request

  - "bookings.html" as a string

  - dictionary containing following key-value pairs:
    - Key: “bookings”
    - Value: booking_json

Save the views.py file and ensure the code has no errors.

### Step 9:

Go to the app-level urls.py file and remove the comment for the URL configuration of the view functions below:

- bookings

- book

### Step 10:

Open the file book.html file present inside the templates folder and update the code as per the instructions below.

Add a heading using the <h1> tag that says, Make a reservation.

### Step 11:

Now step inside the \<script> tags and add the following pseudo code to update the book.html file.

- Call the log() function on console and pass the argument “Hello” inside it

- Call the function getElementById() on the document and pass the string "id_reservation_date" to it as an argument.
  - Suffix the code by adding a filter type="date" using a dot operator.

### Step 12:

Now open the bookings.html file present inside the templates folder and update the code as per the instructions below.

Add a heading using the <h1> tag that says All Reservations

### Step 13:

Now step inside the \<script> tags and add the following pseudo code to update the bookings.html file.

- Create a constant called bookings and assign it the value of parse() function called over JSON. Pass the following argument inside the parse() function:
  - '{{ bookings|safe }}'

- Call the log() function on console and pass bookings to it as an argument.

- Create a constant called pretty_json and assign it the value of:
  - stringify() function called over JSON and pass the following arguments to it:
    - bookings
    - null
    - 2

Note: Observe the code added inside the file bookings.html and save the file. Make sure there are no errors present in your code.

### Step 14:

Open the file index.html and look for the comment:

- \<!-- Add code here for book -->

Replace the comment with the following code:

- \<a href="{% url 'book' %}">Book your table now</a>

### Step 15:

Open the file_header.html inside the templates or partials folder and look for the comments:

- \<!-- Add code here for the book template -->

- \<!-- Add code here for the reservations template -->

Replace the comment with the following code:

- \<li>\<a href="{% url 'book' %}">Book</a></li>

- \<li>\<a href="{% url 'bookings' %}">Reservations</a></li>

### Step 16:

Add a command to run the server and go to the localhost URL.

### Step 17:

Go to the tab Book and add three entries inside the form.

### Step 18:

Once the entries are updated, go to the Reservations tab that you see in the menu bar. You will be able to observe the entries are updated.

Note: This is the same data that has been updated in the database of the Little Lemon website and can be verified in the database.
