import React, { useState } from "react";
import "./FindDoctorSearch.css";
import { useNavigate } from "react-router-dom";
import { specialityOptions } from "../../data/doctorData";

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [specialities] = useState(specialityOptions);

  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // Navigate to Booking Consultation page
    navigate(`/booking-consultation?speciality=${encodeURIComponent(speciality)}`);
  };

  return (
    <div className="finddoctor">
      <center>
        <h1 className="finddoctor-title">
          Find a Doctor and Book Appointment
        </h1>

        <div>
          <i
            className="fa fa-user-md"
            style={{ color: "#0f2e63", fontSize: "3rem" }}
          ></i>
        </div>

        <div
          className="home-search-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors by speciality"
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() =>
                setTimeout(() => setDoctorResultHidden(true), 200)
              }
            />

            <div className="findiconimg">
              <img
                className="findIcon"
                src="/images/search.svg"
                alt="Search"
              />
            </div>

            {!doctorResultHidden && (
              <div className="search-doctor-input-results">
                {specialities
                  .filter((item) =>
                    item
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
                          width="12"
                          height="12"
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
      </center>
    </div>
  );
};

export default FindDoctorSearch;
