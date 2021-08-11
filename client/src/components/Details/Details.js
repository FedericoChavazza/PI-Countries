import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryDetails } from "../../actions/index";
import { Link } from "react-router-dom";

export default function OnlyCountry(props) {
  const oneCountry = useSelector((state) => state.detailCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    const countryId = props.match.params.id;
    dispatch(countryDetails(countryId));
    console.log(oneCountry);
  }, []);
  return (
    <div>
      <h1>
        <Link to="/countries">
          <h2>go back!</h2>
        </Link>
        <ul>
          <li>name: {oneCountry.name}</li>
          <li>
            <img src={oneCountry.img}></img>
          </li>
          <li>capital : {oneCountry.capital}</li>
          <li>continente : {oneCountry.continent}</li>
        </ul>
      </h1>
    </div>
  );
}
