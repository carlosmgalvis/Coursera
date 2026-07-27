import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

const GiveReviews = ({
  onSubmit,
  doctorName,
  doctorSpeciality,
  initialName = "",
  submittedReview,
}) => {
  const [formData, setFormData] = useState({
    name: initialName,
    review: "",
    rating: 0,
  });

  const [warning, setWarning] = useState("");

  useEffect(() => {
    setFormData({
      name: submittedReview?.name || initialName,
      review: submittedReview?.review || "",
      rating: submittedReview?.rating || 0,
    });
    setWarning("");
  }, [doctorName, initialName, submittedReview]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.review === "" ||
      formData.rating === 0
    ) {
      setWarning("Please fill all fields.");
      return;
    }

    setWarning("");

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Give Your Review</h2>
      <p className="review-form-subtitle">
        Reviewing {doctorName} · {doctorSpeciality}
      </p>

      {warning && <p className="warning">{warning}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Review:</label>

        <textarea
          name="review"
          rows="5"
          value={formData.review}
          onChange={handleChange}
        ></textarea>

        <label>Rating:</label>

        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= formData.rating ? "star active-star" : "star"
              }
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default GiveReviews;
