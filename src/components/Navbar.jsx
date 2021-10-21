import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container fluid="xl">
      <nav className="navbar">
        <Link to="/" className="logo">
          Unacoin
        </Link>
      </nav>
    </Container>
  );
};

export default Navbar;
