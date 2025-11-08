import React from "react";

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div>
          <h3 style={styles.logo}>JobPortal</h3>
          <p>Connecting talent with opportunity.</p>
        </div>

        <div style={styles.links}>
          <a href="/about">About</a>
          <a href="/jobs">Jobs</a>
          <a href="/employers">Employers</a>
          <a href="/contact">Contact</a>
        </div>

        <div style={styles.social}>
          <a href="#">🌐</a>
          <a href="#">📘</a>
          <a href="#">🐦</a>
          <a href="#">💼</a>
        </div>
      </div>
      <p style={styles.copy}>
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "2rem 1rem",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "1rem",
  },
  logo: { fontSize: "1.25rem", fontWeight: "bold" },
  links: { display: "flex", gap: "1rem" },
  social: { display: "flex", gap: "1rem", fontSize: "1.2rem" },
  copy: { fontSize: "0.9rem", color: "#94a3b8" },
};
