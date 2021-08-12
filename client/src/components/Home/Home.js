import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home">
      <div id="slider">
        <figure>
          <img src="https://iea.imgix.net/817ded0e-7bb6-4b79-b425-65e6f7b705f1/shutterstock_1484419673.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C517%2C3840%2C1643" />
          <img src="https://cdn.theculturetrip.com/wp-content/uploads/2017/10/hernan-pinera-2-1024x576.jpg" />
          <img src="https://iea.imgix.net/817ded0e-7bb6-4b79-b425-65e6f7b705f1/shutterstock_1484419673.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C517%2C3840%2C1643" />
          <img src="https://images.theconversation.com/files/335290/original/file-20200515-138610-a2el71.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop" />
          <img src="https://iea.imgix.net/817ded0e-7bb6-4b79-b425-65e6f7b705f1/shutterstock_1484419673.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C517%2C3840%2C1643" />
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
