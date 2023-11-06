import React from "react";
import CardHome from "../CardHome/CardHome";
import Carrousel from "./Carousel";

function Home() {
  return (
    <>
      <Carrousel />
      <div className="flex flex-wrap">
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
      </div>
    </>
  );
}

export default Home;
