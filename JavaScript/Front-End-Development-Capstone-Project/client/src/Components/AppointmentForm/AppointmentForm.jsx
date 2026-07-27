import React, { useState } from "react";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [phoneNumber, setPhoneNumber] = useState(
    sessionStorage.getItem("phone") || ""
  );
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      phoneNumber,
      appointmentDate,
      appointmentTime,
      doctorName,
      doctorSpeciality,
    });

    setAppointmentDate("");
    setAppointmentTime("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>Book Appointment</h3>

      <div className="form-group">
        <label htmlFor="name">Patient Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
