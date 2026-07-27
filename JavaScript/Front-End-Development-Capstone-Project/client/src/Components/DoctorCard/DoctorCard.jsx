import React, { useEffect, useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import { APPOINTMENT_STORAGE_KEY } from "../../data/doctorData";

const DoctorCard = ({
  id,
  name,
  speciality,
  experience,
  ratings,
  profilePic,
  avatarColor = "#edf4ff",
}) => {
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const storedAppointment = JSON.parse(
      localStorage.getItem(APPOINTMENT_STORAGE_KEY)
    );

    if (storedAppointment?.doctorId === id) {
      setAppointment(storedAppointment);
    }
  }, [id]);

  const handleSubmit = (appointmentData) => {
    const nextAppointment = {
      ...appointmentData,
      doctorId: id,
      doctorName: name,
      doctorSpeciality: speciality,
    };

    localStorage.setItem(
      APPOINTMENT_STORAGE_KEY,
      JSON.stringify(nextAppointment)
    );
    window.dispatchEvent(new Event("appointment-updated"));
    setAppointment(nextAppointment);
    setShowForm(false);
  };

  const handleCancel = () => {
    localStorage.removeItem(APPOINTMENT_STORAGE_KEY);
    window.dispatchEvent(new Event("appointment-updated"));
    setAppointment(null);
  };

  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const ratingStars =
    "★".repeat(ratings) + "☆".repeat(Math.max(0, 5 - ratings));

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div
          className="doctor-card-profile-image-container doctor-avatar"
          style={{ backgroundColor: avatarColor }}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt={name}
              className="doctor-profile-image"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>

          <div className="doctor-card-detail-speciality">
            {speciality}
          </div>

          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>

          <div className="doctor-card-detail-consultationfees">
            Ratings: <span className="doctor-card-stars">{ratingStars}</span>
          </div>

          {!appointment ? (
            <button
              className="book-appointment-btn"
              onClick={() => setShowForm(true)}
            >
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          ) : (
            <button
              className="book-appointment-btn cancel-appointment"
              onClick={handleCancel}
            >
              Cancel Appointment
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <AppointmentForm
          doctorName={name}
          doctorSpeciality={speciality}
          onSubmit={handleSubmit}
        />
      )}

      {appointment && (
        <div className="bookedInfo">
          <h3>Appointment Booked!</h3>

          <p>
            <strong>Name:</strong> {appointment.name}
          </p>

          <p>
            <strong>Phone:</strong> {appointment.phoneNumber}
          </p>

          <p>
            <strong>Date:</strong> {appointment.appointmentDate}
          </p>

          <p>
            <strong>Time:</strong> {appointment.appointmentTime}
          </p>

          <button
            type="button"
            className="bookedInfo-cancel"
            onClick={handleCancel}
          >
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
