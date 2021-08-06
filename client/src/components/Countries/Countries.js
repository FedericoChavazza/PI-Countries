import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../actions/index";
import { connect } from "react-redux";
import country from "../../reducer";

function NavCountries(props) {
  const [countrySearch, setCountrySearch] = useState("");
  const [orderCountries, setorderCountries] = useState({
    order: "",
    continent: "DefaultCountries",
  });
  const [filterCountries, setCountriesFilter] = useState([]);

  function handleFilter(event) {
    setorderCountries({
      ...orderCountries,
      [event.target.name]: event.target.value,
    });
  }

  function handleChange(event) {
    setCountrySearch(event.target.value);
    console.log(event.target.name);
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.getCountries(countrySearch);
    console.log(event.target.name);
    console.log(event.target.value);
  }

  useEffect(() => {
    props.getCountries(countrySearch);
  }, []);
  /////////////useEffect to order//////////////
  useEffect(() => {
    var filter = props.country;

    ////////////////Continents///////////////

    if (orderCountries.continent !== "DefaultCountries") {
      filter = props.country.filter((e) => {
        return e.continent === orderCountries.continent;
      });
    }
    //////////////////Alphabetical/////////////
    if (orderCountries.order === "Dec") {
      filter = filter.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    if (orderCountries.order === "Asc") {
      filter = filter.slice().sort((b, a) => a.name.localeCompare(b.name));
    }

    ////////////////Population///////////////

    if (orderCountries.order === "PopulationDec") {
      filter = filter
        .slice()
        .sort((a, b) => (a.population < b.population ? 1 : -1));
    }
    if (orderCountries.order === "PopulationAsc") {
      console.log("hola");
      filter = filter
        .slice()
        .sort((a, b) => (a.population > b.population ? 1 : -1));
    }

    console.log(filter);
    console.log(orderCountries);

    setCountriesFilter(filter);
  }, [orderCountries, props.country]);
  console.log(filterCountries);
  return (
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Search Countries!</h3>
          <input
            placeholder="search..."
            type="text"
            id="title"
            autoComplete="off"
            value={countrySearch}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Button</button>
        </form>
      </div>
      {filterCountries.map((e) => (
        <div>
          <Link to={`/countries/${e.id}`}>
            <h3>{e.name}</h3>
          </Link>
        </div>
      ))}{" "}
      <select name="order" onChange={(e) => handleFilter(e)}>
        <option value="Dec">Dec</option>
        <option value="Asc">Asc</option>
      </select>
      <select name="order" onChange={(e) => handleFilter(e)}>
        <option value="PopulationDec">Dec</option>
        <option value="PopulationAsc">Asc</option>
      </select>
      <select name="continent" onChange={(e) => handleFilter(e)}>
        <option selected value="DefaultCountries">
          Default
        </option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Polar">Polar</option>
      </select>
      <Link to="/activity">
        <button>buenosDias</button>
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    country: state.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountries: (country) => dispatch(getCountries(country)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavCountries);
