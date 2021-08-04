import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../src/components/Home/Home";
import NavCountries from "../src/components/Countries/Countries";
import OnlyCountry from "../src/components/Details/Details";
import { Tourism } from "../src/components/Tourism/Tourism";

function App() {
  return (
    <div className="App">
      <Route exact path="/countries/:id" component={OnlyCountry} />
      <Route exact path="/" component={Home} />
      <Route exact path="/countries" component={NavCountries} />
      <Route exact path="/activity" component={Tourism} />
    </div>
  );
}

export default App;
