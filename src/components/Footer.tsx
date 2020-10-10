import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <nav className="footer">
      <div className="footer__ourTeam">
        <h1>Our Team</h1>
        <span className="footer__ourTeam__member">Couyoupetrou Julien</span>
        <span className="footer__ourTeam__member">Deleuze Antoine</span>
        <span className="footer__ourTeam__member">Deleuze Thibault</span>
        <span className="footer__ourTeam__member">Vignal Valentin</span>
      </div>
    </nav>
  );
}
