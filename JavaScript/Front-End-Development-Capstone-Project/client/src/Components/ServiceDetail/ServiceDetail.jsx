import React from "react";
import { Link, useParams } from "react-router-dom";
import { serviceDetails } from "../../data/serviceData";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <main className="service-detail-page">
        <div className="service-detail-card">
          <h1>Service Not Found</h1>
          <p>The requested service page is not available right now.</p>
          <Link to="/services" className="service-detail-link">
            Back to Best Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="service-detail-page">
      <div className="service-detail-card">
        <p className="service-detail-eyebrow">Dummy Service Data</p>
        <h1>{service.title}</h1>
        <p className="service-detail-summary">{service.summary}</p>

        <div className="service-detail-sections">
          {service.sections.map((section) => (
            <section key={section.heading} className="service-detail-section">
              <h2>{section.heading}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="service-detail-tips">
          <h2>Helpful Notes</h2>
          <ul>
            {service.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <Link to="/services" className="service-detail-link">
          Back to Best Services
        </Link>
      </div>
    </main>
  );
};

export default ServiceDetail;
