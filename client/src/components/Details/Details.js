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
            <p>Name : {oneCountry.name}</p>
            <p>Capital : {oneCountry.capital}</p>
            <p>Continent : {oneCountry.continent}</p>
            <p>SubRegion : {oneCountry.subregion} </p>
            <p>Area : {oneCountry.area} km²</p>
            <p>Population : {oneCountry.population} people</p>
          </div>
          <div className="labelSUPREMO">
            {details !== undefined && Object.keys(details).length !== 0 ? (
              <label>
                Here you can change the activity you want by just clicking them!
              </label>
            ) : (
              <label>No activities yet</label>
            )}
          </div>
          {details !== undefined && Object.keys(details).length !== 0
            ? details.map((e, i) => {
                return (
                  <div key={i}>
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
                  </div>
                );
              })
            : []}
        </div>
      </div>
    </div>
  );
}
