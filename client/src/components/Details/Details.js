import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryDetails } from "../../actions/index";
import { Link } from "react-router-dom";

export default function OnlyCountry(props) {
  const oneCountry = useSelector((state) => state.detailCountries);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const countryId = props.match.params.id;
    dispatch(countryDetails(countryId));
  }, []);

  useEffect(() => {
    setDetails(oneCountry.activities);
    console.log(details);
  }, [details, oneCountry]);

  return (
    <div className="li">
      <h1>
        <Link to="/countries">
          <h2>go back!</h2>
        </Link>
        <ul list-style-type="none">
          <li>
            <img src={oneCountry.img}></img>
          </li>
          <div className="detailsCountry">
            <li>name : {oneCountry.name}</li>
            <li>capital : {oneCountry.capital}</li>
            <li>continent : {oneCountry.continent}</li>
            <li>subRegion : {oneCountry.subregion} </li>
            <li>area : {oneCountry.area} </li>
            <li>population : {oneCountry.population} </li>
          </div>
          {details !== undefined && Object.keys(details).length !== 0
            ? details.map((e, i) => {
                return (
                  <div className="activitieslol">
                    <li>activities {i + 1} </li>
                    <div>
                      <li>{e.name}</li>
                      <li>minutes:{e.duration}</li>
                      <li>difficulty: {e.difficulty} out of 5</li>
                      <li>season: {e.season}</li>
                    </div>
                  </div>
                );
              })
            : []}
        </ul>
      </h1>
    </div>
  );
}
