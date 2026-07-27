import React, { useEffect, useMemo, useState } from "react";
import ReviewForm from "./ReviewForm";
import GiveReviews from "./GiveReviews";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    speciality: "Cardiology",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    speciality: "Dermatology",
  },
];

const STORAGE_KEY = "doctor-reviews";

const ReviewFormApp = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const storedReviews = localStorage.getItem(STORAGE_KEY);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const selectedReview = useMemo(
    () => reviews[selectedDoctor.id],
    [reviews, selectedDoctor]
  );

  const handleReviewSubmit = (reviewData) => {
    const nextReviews = {
      ...reviews,
      [selectedDoctor.id]: {
        ...reviewData,
        submittedAt: new Date().toISOString(),
      },
    };

    setReviews(nextReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReviews));
  };

  return (
    <div className="reviews-page">
      <div className="reviews-page__header">
        <h1>Patient Reviews</h1>
        <p>
          Select a doctor, share your experience, and keep your reviews
          saved on this device.
        </p>
      </div>

      <div className="reviews-layout">
        <div className="reviews-list">
          {doctors.map((doctor) => (
            <ReviewForm
              key={doctor.id}
              doctorName={doctor.name}
              doctorSpeciality={doctor.speciality}
              review={reviews[doctor.id]}
              isActive={selectedDoctor.id === doctor.id}
              onReviewClick={() => setSelectedDoctor(doctor)}
            />
          ))}
        </div>

        <div className="reviews-panel">
          <GiveReviews
            doctorName={selectedDoctor.name}
            doctorSpeciality={selectedDoctor.speciality}
            initialName={sessionStorage.getItem("name") || ""}
            submittedReview={selectedReview}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewFormApp;
