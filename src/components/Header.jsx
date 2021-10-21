import React from "react";
import { Container } from "react-bootstrap";
import Trending from "./Trending";

const Header = () => {
  return (
    <Container fluid="xl">
      <div className="header py-5">
        <h1 className="hero-cta">The Easiest way to</h1>
        <h1 className="hero-cta-2">Track Multiple Currencies</h1>
        <p>
          Unacoin's allow you to track and monitor multiple crypto currencies
        </p>
        <p>without limits and save your favorites.</p>
      </div>
      <Trending />
    </Container>
  );
};

export default Header;
