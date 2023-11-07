import React from "react";
import CardHome from "./CardHome";
import Carrousel from "./Carousel";

function Home() {
  return (
    <>
      <Carrousel />
      <div className="flex flex-col items-center md:flex-row md:flex-wrap">
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
