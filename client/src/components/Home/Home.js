import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <Link to="/countries">
        <h1>Estas en home</h1>
      </Link>
    </div>
  );
}
