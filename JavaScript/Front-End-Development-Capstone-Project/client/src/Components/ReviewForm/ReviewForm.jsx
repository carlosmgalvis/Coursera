import React from "react";
import "./ReviewForm.css";

const ReviewForm = ({
  doctorName,
  doctorSpeciality,
  onReviewClick,
  review,
  isActive,
}) => {
  return (
    <div className={`review-card ${isActive ? "review-card--active" : ""}`}>
      <div>
        <h3>{doctorName}</h3>
        <p>{doctorSpeciality}</p>
        <span className="review-status">
          {review ? `Reviewed: ${review.rating}/5` : "Not reviewed yet"}
        </span>
      </div>

      <button className="review-btn" onClick={onReviewClick}>
        {review ? "Edit Review" : "Write Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
