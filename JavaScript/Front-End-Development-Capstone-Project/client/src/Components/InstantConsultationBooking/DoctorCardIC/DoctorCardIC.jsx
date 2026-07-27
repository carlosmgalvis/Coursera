import React from "react";
import "./DoctorCardIC.css";

const renderStars = (ratings) =>
  "★".repeat(ratings) + "☆".repeat(Math.max(0, 5 - ratings));

const DoctorCardIC = ({
  name,
  speciality,
  experience,
  ratings,
  avatarColor = "#edf4ff",
}) => {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="doctor-card-container doctor-card-ic">
      <div className="doctor-card-details-container">
        <div
          className="doctor-card-profile-image-container doctor-avatar"
          style={{ backgroundColor: avatarColor }}
        >
          <span>{initials}</span>
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees ic-ratings">
            Ratings: {renderStars(ratings)}
          </div>
        </div>
      </div>

      <button type="button" className="book-appointment-btn">
        <div>Consult Now</div>
        <div>No Booking Fee</div>
      </button>
    </article>
  );
};

export default DoctorCardIC;
