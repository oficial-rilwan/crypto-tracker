import React from "react";
import CoinTable from "../components/CoinTable";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <CoinTable />
    </div>
  );
};

export default Home;
