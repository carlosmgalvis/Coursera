import React from "react";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";
import "./InstantConsultationBooking/InstantConsultation.css";
import { bookingDoctors } from "../data/doctorData";

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const selectedSpeciality = searchParams.get("speciality");
  const visibleDoctors = selectedSpeciality
    ? bookingDoctors.filter(
        (doctor) =>
          doctor.speciality.toLowerCase() ===
          selectedSpeciality.toLowerCase()
      )
    : bookingDoctors;

  return (
    <div className="instant-consultation-container">
      <FindDoctorSearch />

      {selectedSpeciality && (
        <>
          <h2 className="booking-results-count">
            {visibleDoctors.length} doctors available in
          </h2>
          <p className="booking-results-speciality">
            {selectedSpeciality}
          </p>
          <p className="booking-results-copy">
            Book appointments with minimum wait-time & verified doctor
            details
          </p>
        </>
      )}

      <div className="services-results">
        {visibleDoctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id || index}
            id={doctor.id}
            name={doctor.name}
            speciality={doctor.speciality}
            experience={doctor.experience}
            ratings={doctor.ratings}
            avatarColor={doctor.avatarColor}
          />
        ))}

        {!visibleDoctors.length && (
          <p className="services-empty-state">
            No doctors found for {selectedSpeciality}. Try another
            speciality.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
