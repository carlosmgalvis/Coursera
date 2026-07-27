import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const Landing_Page = () => {
  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1>
            <span className="hero-primary">Your Health</span> <br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>

          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>

          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>

          <h4>
            Embrace the art of self-care, for a healthy mind and body
            forge the foundation of a vibrant life. Wellness is not just
            a destination; it's a journey of mindful choices and daily
            transformations. Nurture your health with love, and watch it
            bloom into a beacon of joy and vitality.
          </h4>

          <Link to="/services">
            <button className="button" type="button">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page;
