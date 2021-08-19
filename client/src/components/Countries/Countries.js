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
    console.log(event);
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

    //agarro el arreglo de actividades recien creado y le pusheo la informacion de las distintas actividades que existen
    // pregunto en el caso de que ya existan y en el caso en que no

    props.country.forEach((e) => {
      e.activities.forEach((actividad) => {
        if (activity.includes(actividad.name)) {
          return;
        } else {
          activity.push(actividad.name);
        }
      });
    });

    // en caso de que el valor del select sea diferente de default, busco que me encuentre el objeto con la actividad
    // que coincida con el valor del option de dicho select, este filtrado me lo traera  ===> [{...}] y esto pisara
    // filter con aquellos paises los cuales coincidan con las actividades

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

    ///////////Area/////////////////
    if (orderCountries.order === "areaDec") {
      filter = [...filter].sort((a, b) => (a.area < b.area ? 1 : -1));
    }
    if (orderCountries.order === "areaAsc") {
      filter = [...filter].sort((a, b) => (a.area > b.area ? 1 : -1));
    }

    setCountriesFilter(filter);
  }, [orderCountries, props.country, selectActivity]);

  return (
    <div>
      {/*  aca seteo mi formulario el cual hago los filtrados */}

      <div className="searchBar">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Search Countries!</h3>

          <input
            placeholder="search by name..."
            type="text"
            id="title"
            autoComplete="off"
            value={countrySearch}
            onChange={(e) => handleChange(e)}
          />
          <div className="image"></div>
        </form>
      </div>
      <div className="nav">
        <div className="ok">
          <div className="hola">
            <div>
              <h3>
                Here, you'll be able to change, group countries the way you want
                or create a new Activity for a specific one!
              </h3>
            </div>
            <div>
              <label>Alphabetical</label>
            </div>
            <select name="order" onChange={(e) => handleFilter(e)}>
              <option value="Dec">Descendant</option>
              <option value="Asc">Ascendant</option>
            </select>
          </div>
          <div className="hola">
            <div>
              <label>Population</label>
            </div>
            <select name="order" onChange={(e) => handleFilter(e)}>
              <option value="PopulationDec">Descendant</option>
              <option value="PopulationAsc">Ascendant</option>
            </select>
          </div>
          <div className="hola">
            <div>
              <label>Continent</label>
            </div>
            <select name="continent" onChange={(e) => handleFilter(e)}>
              <option defaultValue value="DefaultCountries">
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
            <div>
              <label>Area</label>
            </div>
            <select name="order" onChange={(e) => handleFilter(e)}>
              <option value="areaAsc">Ascendant</option>
              <option value="areaDec">Descendant</option>
            </select>
          </div>
          <div className="hola">
            <div>
              <label>Activities</label>
            </div>

            {/* aca adentro mapeo las actividades que puse en el arreglo "activity" y puse dentro del estado "filterActivities" ,
            el handleSelect agarra el valor especifico del option el cual fue seleccionado y tiene asignado su value, asi despues setea 
            el estado "selectActivity"*/}

            <select onChange={(e) => handleSelect(e)}>
              <option defaultValue value="default">
                Default
              </option>
              {filterActivities.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="hola">
            <Link to="/activity">
              <button>Activity</button>
            </Link>
          </div>
        </div>
      </div>
      {/* aca divido los paises segun el resultado de "buttonNum" el cual posee el valor del boton el cual ah sido
                seleccionado, con este fin realiza la cuenta para traerme paises especificos del arreglo */}

      <div className="grid">
        {filterCountries.length !== 0 ? (
          filterCountries
            .slice(9 * buttonNum - 9, 9 * buttonNum)
            .map((e, i) => (
              <div key={i} className="countryCard">
                <Link to={`/countries/${e.id}`}>
                  <img src={e.img} />
                  <div className="countryCard-name">{e.name}</div>
                </Link>
              </div>
            ))
        ) : (
          <h3 className="not-found">Country not found! :(</h3>
        )}{" "}
      </div>
      <div className="absolute">
        <div className="buttonSearch">
          {num.map((e, i) => {
            return (
              e !== 0 && (
                <button key={i} value={e} onClick={(e) => handleButton(e)}>
                  {e}
                </button>
              )
            );
          })}
        </div>
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
