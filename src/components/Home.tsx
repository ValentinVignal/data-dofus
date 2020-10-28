import React from "react";
import "./Home.css";
import TableUsers from "./TableUsers";

export default function Home() {
  return (
    <div className="home">
      <h1>Data Dofus</h1>
      <p>Welcome to data dofus</p>
      <p>
        This fairly new project will display data from Dofus players accross
        different servers. The goal is to display custom ranking from their
        stats.
      </p>
      <TableUsers/>
    </div>
  );
}
