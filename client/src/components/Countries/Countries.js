import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../actions/index";
import { connect } from "react-redux";
import country from "../../reducer";
import style from "../Countries/Countries.css";

function NavCountries(props) {
  const [countrySearch, setCountrySearch] = useState("");
  const [orderCountries, setorderCountries] = useState({
    order: "",
    continent: "DefaultCountries",
  });
  const [filterCountries, setCountriesFilter] = useState([]);
  const [filterActivities, setFilterActivities] = useState([]);
  const [selectActivity, setSelectActivity] = useState("default");
  const [num, setNum] = useState([]);
  const [buttonNum, setButtonNum] = useState("1");

  function handleButton(event) {
    console.log(num);
    setButtonNum(event.target.value);
    console.log(buttonNum);
  }

  function handleSelect(event) {
    setSelectActivity(event.target.value);
  }

  function handleFilter(event) {
    setorderCountries({
      ...orderCountries,
      [event.target.name]: event.target.value,
    });
  }

  function handleChange(event) {
    setCountrySearch(event.target.value);
    props.getCountries(event.target.value);
    setButtonNum("1");
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.getCountries(countrySearch);
    setButtonNum("1");
  }

  useEffect(() => {
    var mapNum = [];

    var count = Math.ceil(filterCountries.length / 9);
    for (let d = 0; d < count; d++) {
      mapNum.push(d + 1);
    }
    console.log(mapNum);
    setNum(mapNum);
  }, [filterCountries]);

  useEffect(() => {
    props.getCountries(countrySearch);
  }, []);
  /////////////useEffect to order//////////////
  useEffect(() => {
    var filter = props.country;
    var activity = [];
    var mapNum = [];

    var count = Math.ceil(filter.length / 9);
    for (let d = 0; d <= count; d++) {
      mapNum.push(d);
    }
    console.log(mapNum);
    setNum(mapNum);

    ////////////////Continents///////////////

    if (orderCountries.continent !== "DefaultCountries") {
      filter = props.country.filter((e) => {
        return e.continent === orderCountries.continent;
      });
    }

    props.country.forEach((e) => {
      e.activities.forEach((actividad) => {
        if (activity.includes(actividad.name)) {
          return;
        } else {
          activity.push(actividad.name);
        }
      });
    });

    if (selectActivity !== "default") {
      filter = filter.filter((e) => {
        var yes = e.activities.find((actividad) => {
          return actividad.name === selectActivity;
        });
        console.log(yes, "hola");
        return yes !== undefined;
      });
    }

    // console.log(activity);

    // for (let key in filter) {
    //   if (filter[key].activities.length !== 0) {
    //     filter[key].activities.forEach((e) => {
    //       if (activity.includes(e.name)) {
    //         return;
    //       } else {
    //         activity.push(e.name);
    //       }
    //     });
    //   }
    // }
    setFilterActivities(activity);

    //////////Alphabetical////////////////

    if (orderCountries.order === "Dec") {
      filter = filter.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    if (orderCountries.order === "Asc") {
      filter = filter.slice().sort((b, a) => a.name.localeCompare(b.name));
    }

    //////////Population/////////////////

    if (orderCountries.order === "PopulationDec") {
      filter = [...filter].sort((a, b) =>
        a.population < b.population ? 1 : -1
      );
    }
    if (orderCountries.order === "PopulationAsc") {
      filter = [...filter].sort((a, b) =>
        a.population > b.population ? 1 : -1
      );
    }

    setCountriesFilter(filter);
  }, [orderCountries, props.country, selectActivity]);

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
        </form>
      </div>
      <div className="nav">
        <div className="ok">
          <div className="hola">
            <label>Alphabetical</label>
            <select name="order" onChange={(e) => handleFilter(e)}>
              <option value="Dec">Dec</option>
              <option value="Asc">Asc</option>
            </select>
          </div>
          <div className="hola">
            <label>Population</label>
            <select name="order" onChange={(e) => handleFilter(e)}>
              <option value="PopulationDec">Dec</option>
              <option value="PopulationAsc">Asc</option>
            </select>
          </div>
          <div className="hola">
            <label>Continent</label>
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
          </div>
          <div className="hola">
            <Link to="/inBetween">
              <button>Activity</button>
            </Link>
          </div>
          <div className="hola">
            <select value={selectActivity} onChange={(e) => handleSelect(e)}>
              <option selected value="default">
                default
              </option>
              {filterActivities.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid">
        {filterCountries
          ? filterCountries.slice(9 * buttonNum - 9, 9 * buttonNum).map((e) => (
              <div>
                <Link to={`/countries/${e.id}`}>
                  <h3 className="title">{e.name}</h3>
                  <img className="juan" src={e.img} />
                </Link>
              </div>
            ))
          : []}{" "}
      </div>
      <div>
        {num.map((e) => {
          return (
            e !== 0 && (
              <button value={e} onClick={(e) => handleButton(e)}>
                {e}
              </button>
            )
          );
        })}
      </div>
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
