import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";
import { APPOINTMENT_STORAGE_KEY } from "../../data/doctorData";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const syncAppointment = () => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("auth-token")));
      const storedAppointment = JSON.parse(
        localStorage.getItem(APPOINTMENT_STORAGE_KEY)
      );
      setAppointmentData(storedAppointment);
    };

    syncAppointment();
    window.addEventListener("appointment-updated", syncAppointment);

    return () => {
      window.removeEventListener("appointment-updated", syncAppointment);
    };
  }, []);

  return (
    <div>
      <Navbar />

      {children}

      {isLoggedIn && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h2 className="appointment-card__title">
              Appointment Details
            </h2>

            <p>
              <strong>Doctor:</strong> {appointmentData.doctorName}
            </p>

            <p>
              <strong>Speciality:</strong>{" "}
              {appointmentData.doctorSpeciality}
            </p>

            <p>
              <strong>Name:</strong> {appointmentData.name}
            </p>

            <p>
              <strong>Phone Number:</strong>{" "}
              {appointmentData.phoneNumber}
            </p>

            <p>
              <strong>Date of Appointment:</strong>{" "}
              {appointmentData.appointmentDate}
            </p>

            <p>
              <strong>Time Slot:</strong>{" "}
              {appointmentData.appointmentTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
