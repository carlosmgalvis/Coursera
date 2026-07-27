import React from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";
import { instantConsultDoctors } from "../../data/doctorData";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const selectedSpeciality = searchParams.get("speciality");
  const filteredDoctors = selectedSpeciality
    ? instantConsultDoctors.filter(
        (doctor) =>
          doctor.speciality.toLowerCase() ===
          selectedSpeciality.toLowerCase()
      )
    : [];

  return (
    <main className="searchpage-container instant-consultation-page">
      <FindDoctorSearchIC />

      {selectedSpeciality && (
        <section className="search-results-container instant-results-section">
          <h2>{filteredDoctors.length} doctors available in</h2>
          <div className="instant-speciality-label">
            {selectedSpeciality}
          </div>
          <h3>
            Book appointments with minimum wait-time & verified doctor
            details
          </h3>

          <div className="instant-results-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCardIC {...doctor} key={doctor.id} />
              ))
            ) : (
              <p className="services-empty-state">No doctors found.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default InstantConsultation;
