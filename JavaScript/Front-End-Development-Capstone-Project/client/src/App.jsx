import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Notification from "./Components/Notification/Notification";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Login from "./Components/Login/Login";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation";
import BestServices from "./Components/BestServices/BestServices";
import ServiceDetail from "./Components/ServiceDetail/ServiceDetail";
import HealthBlog from "./Components/HealthBlog/HealthBlog";
import ReviewFormApp from "./Components/ReviewForm/ReviewFormApp";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Routes>
            <Route path="/" element={<Landing_Page />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Sign_Up />} />

            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />

            <Route
              path="/booking-consultation"
              element={<BookingConsultation />}
            />

            <Route
              path="/services"
              element={<BestServices />}
            />

            <Route
              path="/service/:slug"
              element={<ServiceDetail />}
            />

            <Route
              path="/health-blog"
              element={<HealthBlog />}
            />

            <Route
              path="/reviews"
              element={<ReviewFormApp />}
            />

            <Route
              path="/profile"
              element={<ProfileCard />}
            />

            <Route
              path="/reports"
              element={<ReportsLayout />}
            />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
