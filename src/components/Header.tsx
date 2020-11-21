import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {

  return (
    <nav className="header">
      <Link to="/" className="header__link">
        <img
          className="header__logo"
          src="https://www.dafont.com/forum/attach/orig/2/4/24836.png"
          alt=""
        />
      </Link>
      <Link to="/" className="header__link">
        <div className="header__title">
          <h1>Data Dofus</h1>
        </div>
      </Link>
    </nav>
  );
}
