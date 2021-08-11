import React from "react";
import { Link } from "react-router-dom";

export function ActivityChange() {
  return (
    <div>
      <div>aqui puedes elegir a donde ir!</div>;
      <Link to="/activity">
        <button>Create Activity!</button>
      </Link>
      <Link to="/changeActivity">
        <button>Change Activity!</button>
      </Link>
    </div>
  );
}
