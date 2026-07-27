import React from "react";
import { healthBlogPosts } from "../../data/serviceData";
import "./HealthBlog.css";

const HealthBlog = () => {
  return (
    <main className="health-blog-page">
      <section className="health-blog-header">
        <h1>Health Blog</h1>
        <p>
          Explore simple health education content and sample guidance
          articles.
        </p>
      </section>

      <section className="health-blog-grid">
        {healthBlogPosts.map((post) => (
          <article key={post.id} className="health-blog-card">
            <span className="health-blog-category">{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button type="button" className="health-blog-button">
              Read Article
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HealthBlog;
