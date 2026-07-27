# StayHealthy Inc. - Medical Appointment Booking Website

IBM – Full‑Stack Application (Client + Server)
This project implements a modern architecture based on React + Vite for the front-end and Express + MongoDB for the back-end. The structure is organized into two independent applications that run concurrently from a unified `package.json` at the project root.

## Features

- **Medical Appointments Online:**  
  Patients can schedule appointments with doctors anytime, anywhere. They can choose time slots and receive notifications for upcoming appointments.

- **Instant Consultation:**  
  Patients can consult doctors immediately without prior appointments.

- **Doctor Listings:**  
  Patients can search for doctors by specialty, view available doctors with ratings, and read reviews to make informed choices.

- **Consultation Feedback:**  
  Patients can rate consultations based on effectiveness, diagnosis, and communication.

- **Profile Management:**  
  Users can sign up to make appointments, and update their personal information (name, address, phone number, age, etc.).

## 🚀 Main Technologies

### Front‑end (client/)

- React 19
- React Router 7
- Vite 6
- SWC React Plugin
- CSS Modules / Component CSS

### Back‑end (server/)

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- express-validator
- Passport
- Nodemon (mode dev)

## 📁 Project Files

```
front-end-development-capstone-project/
├── client/                             # Front-end (React + Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── AppointmentForm/
│   │   │   │   └── AppointmentForm.jsx
│   │   │   ├── BestServices/
│   │   │   │   ├── BestServices.css
│   │   │   │   └── BestServices.jsx
│   │   │   ├── DoctorCard/
│   │   │   │   ├── DoctorCard.css
│   │   │   │   └── DoctorCard.jsx
│   │   │   ├── FindDoctorSearch/
│   │   │   │   ├── FindDoctorSearch.css
│   │   │   │   └── FindDoctorSearch.jsx
│   │   │   ├── HealthBlog/
│   │   │   │   ├── HealthBlog.css
│   │   │   │   └── HealthBlog.jsx
│   │   │   ├── InstantConsultationBooking/
│   │   │   │   ├── AppointmentFormIC/
│   │   │   │   │   └── AppointmentFormIC.jsx
│   │   │   │   ├── DoctorCardIC/
│   │   │   │   │   ├── DoctorCardIC.css
│   │   │   │   │   └── DoctorCardIC.jsx
│   │   │   │   ├── FindDoctorSearchIC/
│   │   │   │   │   ├── FindDoctorSearchIC.css
│   │   │   │   │   └── FindDoctorSearchIC.jsx
│   │   │   │   ├── InstantConsultation.css
│   │   │   │   └── InstantConsultation.jsx
│   │   │   ├── Landing_Page/
│   │   │   │   ├── Landing_Page.jsx
│   │   │   │   ├── LandingPage.css
│   │   │   │   └── LandingPage.html
│   │   │   ├── Login/
│   │   │   │   ├── Login.css
│   │   │   │   ├── Login.html
│   │   │   │   └── Login.jsx
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.css
│   │   │   │   ├── Navbar.html
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Notification/
│   │   │   │   ├── Notification.css
│   │   │   │   └── Notification.jsx
│   │   │   ├── ProfileCard/
│   │   │   │   ├── ProfileCard.css
│   │   │   │   └── ProfileCard.jsx
│   │   │   ├── ReportsLayout/
│   │   │   │   ├── ReportsLayout.css
│   │   │   │   └── ReportsLayout.jsx
│   │   │   ├── ReviewForm/
│   │   │   │   ├── GiveReview.jsx
│   │   │   │   ├── ReviewForm.css
│   │   │   │   ├── ReviewForm.jsx
│   │   │   │   └── ReviewFormApp.jsx
│   │   │   ├── ServiceDetail/
│   │   │   │   ├── ServiceDetail.css
│   │   │   │   └── ServiceDetail.jsx
│   │   │   ├── Sign_Up/
│   │   │   │   ├── Sign_Up.css
│   │   │   │   ├── Sign_Up.html
│   │   │   │   └── Sign_Up.jsx
│   │   │   └── BookingConsultation.jsx
│   │   ├── data/
│   │   │   ├── doctorData.js
│   │   │   └── serviceData.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── config.js
│   │   ├── index.css
│   │   └── setauthtocken.js
│   ├── .gitignore
│   ├── .nvmrc
│   ├── .oxlintrc.json
│   ├── build.txt
│   ├── index.html
│   ├── login.txt
│   ├── package.json
│   ├── register.txt
│   └── vite.config.js
├── server/                             # Back-end (Express + MongoDB)
│   ├── data/
│   │   └── users.json
│   ├── models/
│   │   └── User.js
│   ├── public/
│   │   └── doctor_images/
│   ├── routes/
│   │   └── auth.js
│   ├── utils/
│   │   └── userStore.js
│   ├── .gitignore
│   ├── db.js
│   ├── index.js
│   └── package.json
├── .gitignore
├── package.json                        # Root orchestrator
└── README.md
```

## ⚙️Installation

At the project root:

```Code
npm install
```

This will automatically install dependencies for:

- client/
- server/

## ▶️ Running the project

Front-end + Back-end together

```Code
npm start
```

Front-end only

```Code
npm run client
```

Back-end only

```Code
npm run server
```

## 🔄 Proxy between Vite and Express

The `client/vite.config.js` file includes:

```js
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:8181",
      changeOrigin: true
    }
  }
}
```

This allows consuming the backend without CORS issues:

```Code
fetch("/api/login")
```

## 🧪 Testing and validation

- The server runs at http://localhost:8181
- The client runs at http://localhost:5173
- Both are started using `npm start`
