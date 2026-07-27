import React from "react";
import { useNavigate } from "react-router-dom";
import { serviceCards } from "../../data/serviceData";
import "./BestServices.css";

const BestServices = () => {
  const navigate = useNavigate();

  return (
    <main className="best-services-page">
      <section className="best-services-hero">
        <h1>Best Services</h1>
        <p>
          Love yourself enough to live a healthy lifestyle.
        </p>
      </section>

      <section className="best-services-grid">
        {serviceCards.map((service) => (
          <button
            key={service.id}
            type="button"
            className="best-service-card"
            onClick={() => navigate(service.route)}
          >
            <div className="best-service-card__art" aria-hidden="true">
              <span>{service.icon}</span>
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <span className="best-service-card__cta">
              {service.ctaLabel}
            </span>
          </button>
        ))}
      </section>
    </main>
  );
};

export default BestServices;
