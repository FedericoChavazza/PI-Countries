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
      <div>
        <Link to="/countries">
          <h2>go back!</h2>
        </Link>
        <div>
          <img src={oneCountry.img}></img>
          <div className="detailsCountry">
            <p>name : {oneCountry.name}</p>
            <p>capital : {oneCountry.capital}</p>
            <p>continent : {oneCountry.continent}</p>
            <p>subRegion : {oneCountry.subregion} </p>
            <p>area : {oneCountry.area} </p>
            <p>population : {oneCountry.population} </p>
          </div>
          {details !== undefined && Object.keys(details).length !== 0
            ? details.map((e, i) => {
                return (
                  <Link to={`/activity/put/${e.id}`}>
                    <div className="activitieslol">
                      <p>activities {i + 1} </p>
                      <div>
                        <p>{e.name}</p>
                        <p>minutes:{e.duration}</p>
                        <p>difficulty: {e.difficulty} out of 5</p>
                        <p>season: {e.season}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : []}
        </div>
      </div>
    </div>
  );
}
