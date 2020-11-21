import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <nav className="footer">
      <Link to='/our-team' className="footer__link">
        <div className="footer__ourTeam">
          <h3>Our Team</h3>
        </div>
      </Link>
    </nav>
  );
}
