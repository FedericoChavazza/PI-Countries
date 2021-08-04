import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCountries,
  orderCountries,
  orderByPopulation,
} from "../../actions/index";
import { connect } from "react-redux";
import country from "../../reducer";

function NavCountries(props) {
  const [countrySearch, setCountrySearch] = useState("");
  const [orderCountries, setorderCountries] = useState("Default");
  const [filterCountries, setCountriesFilter] = useState([]);

  function handleFilter(event) {
    setorderCountries(event.target.value);
    console.log(event.target.value, orderCountries);
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
    props.orderCountries(orderCountries);
    var filter = [];
    if (orderCountries === "Default") {
      filter = [...props.country];
    }
    if (orderCountries === "Dec") {
      filter = [...props.country].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (orderCountries === "Asc") {
      filter = [...props.country].sort((b, a) => a.name.localeCompare(b.name));
    }
    setCountriesFilter(filter);
  }, [orderCountries, props.country]);

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
      <select onChange={(e) => handleFilter(e)}>
        <option selected value="Default">
          default
        </option>
        <option value="Dec">Dec</option>
        <option value="Asc">Asc</option>
      </select>
      <select onChange={(e) => handleFilter(e)}>
        <option selected value="PopulationD">
          default
        </option>
        <option value="PopulationDec">Dec</option>
        <option value="PopulationAsc">Asc</option>
      </select>
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
    orderCountries: (order) => dispatch(orderCountries(order)),
    orderByPopulation: (population) => dispatch(orderByPopulation(population)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavCountries);
