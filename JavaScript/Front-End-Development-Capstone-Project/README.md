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
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Landing_Page/
│   │   │   │   ├── Landing.tsx
│   │   │   │   └── LandingPage.css
│   │   │   ├── Login/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Login.css
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   └── Sign_Up/
│   │   │       ├── SignUp.jsx
│   │   │       └── Sign_Up.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── Setauthtoken.js
│   └── vite.config.js
├── server/                             # Back-end (Express + MongoDB)
│   ├── models/
│   │   └── User.js
│   ├── public/
│   │   └── doctor_images/
│   ├── routes/
│   │   └── auth.js
│   ├── .gitignore
│   ├── db.js
│   └── index.js
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
      target: "http://localhost:5000",
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

- The server runs at http://localhost:5000
- The client runs at http://localhost:5173
- Both are started using `npm start`
