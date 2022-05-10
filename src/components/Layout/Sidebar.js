import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./index.css";
const Sidebar = () => {
  return (
    <div
      className="bg-secondary sidebar-wrapper"
      style={{ height: "95vh", width: "195px" }}
    >
      <ul style={{ listStyle: "none", padding: "0.5rem" }}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <Link to="/editor" style={{ textDecoration: "none" }}>
          <li>Editor</li>
        </Link>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <li>Fasta</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
