import React, { useState } from "react";
import "./FindDoctorSearchIC.css";
import { useNavigate } from "react-router-dom";
import { specialityOptions } from "../../../data/doctorData";

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(
      `/instant-consultation?speciality=${encodeURIComponent(speciality)}`
    );
  };

  return (
    <section className="instant-search-page">
      <h1>Find a doctor and Consult instantly</h1>

      <div className="instant-search-illustration" aria-hidden="true">
        <div className="instant-phone">
          <div className="instant-phone__doctor"></div>
        </div>
      </div>

      <div className="home-search-container">
        <div className="doctor-search-box instant-doctor-search-box">
          <input
            type="text"
            className="search-doctor-input-box"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setDoctorResultHidden(false)}
            onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />

          <div className="findiconimg">
            <img className="findIcon" src="/images/search.svg" alt="" />
          </div>

          {!doctorResultHidden && (
            <div className="search-doctor-input-results instant-search-results">
              {specialityOptions
                .filter((speciality) =>
                  speciality
                    .toLowerCase()
                    .includes(searchDoctor.toLowerCase())
                )
                .map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span>
                      <img
                        src="/images/search.svg"
                        alt=""
                        style={{ height: "10px", width: "10px" }}
                        width="12"
                      />
                    </span>
                    <span>{speciality}</span>
                    <span>SPECIALITY</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FindDoctorSearchIC;
