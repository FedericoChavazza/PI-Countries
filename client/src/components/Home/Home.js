import React from "react";
import { Link } from "react-router-dom";
import BANDERA from "./images/BANDERA.jpg";
import WORLD from "./images/FEDEFEDEFEDE.jpg";
import PEOPLE from "./images/PEOPLE.jpg";

export function Home() {
  return (
    <div className="home">
      <div id="slider">
        <figure>
          <img src={WORLD} />
          <img src={BANDERA} />
          <img src={WORLD} />
          <img src={PEOPLE} />
          <img src={WORLD} />
        </figure>
      </div>
      <div className="estasHome">
        <Link to="/countries">
          <h1>Estas en home</h1>
        </Link>
      </div>
    </div>
  );
}
