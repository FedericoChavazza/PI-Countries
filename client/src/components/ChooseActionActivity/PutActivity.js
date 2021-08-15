import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCountries, getCountries } from "../../actions";
import { Link } from "react-router-dom";
import style from "../Countries/Countries.css";
import { PutActivity, getActivityDetail } from "../../actions";

export function PutActivities(props) {
  var country = useSelector((state) => state.countries);
  var detailActivity = useSelector((state) => state.activityDetail);
  var dispatch = useDispatch();

  const inputPaises = useRef();

  const [countryMap, setCountryMap] = useState([]);
  const [putActividad, setputActividad] = useState({
    idCountry: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });
  const [errorHandler, setErrorHandler] = useState({});
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getActivityDetail(id));
  }, []);

  useEffect(() => {
    if (detailActivity.countries) {
      var fuego = detailActivity.countries.map((e) => {
        return e.id;
      });
      setputActividad({
        ...putActividad,
        idCountry: fuego,
        name: detailActivity.name,
        difficulty: detailActivity.difficulty,
        duration: detailActivity.duration,
        season: detailActivity.season,
        idActivity: id,
      });
    }
  }, [detailActivity]);

  useEffect(() => {
    var info = country;
    var data = [];
    for (let i = 0; i < country.length; i++) {
      data.push(info[i].name.toLowerCase());
      setCountryMap(data);
    }
  }, [country]);

  function handleChange(e) {
    setputActividad({ ...putActividad, [e.target.name]: e.target.value });
  }

  function handleInput(e) {
    dispatch(getCountries(e.target.value));
  }

  function addCountry(e) {
    console.log(e);
    const dataKey = [];
    var juan = country;

    var information = juan.filter(
      (i) => i.name.toLowerCase() === e.toLowerCase()
    );

    console.log(information);
    for (let i = 0; i < information.length; i++) {
      if (information[i].name.toLowerCase() === e.toLowerCase()) {
        dataKey.push(information[i].id);
        console.log(dataKey);
        if (putActividad.idCountry.includes(dataKey[0])) {
          console.log(putActividad.idCountry);
          return;
        } else {
          return setputActividad({
            ...putActividad,
            idCountry: [...putActividad.idCountry, ...dataKey],
          });
        }
      }
    }
  }

  function deleteCountry(pais) {
    let filtradoSUPREMO = putActividad.idCountry.filter((e) => e !== pais);
    console.log("hola", filtradoSUPREMO);
    setputActividad((prevState) => {
      return {
        ...prevState,
        idCountry: filtradoSUPREMO,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  function ultimateSubmit(e) {
    e.preventDefault();
    let locura = error(putActividad);

    if (Object.keys(locura).length === 0) {
      dispatch(PutActivity(putActividad));

      alert(
        `se ha subido actividades a los siguientes paises! ${putActividad.idCountry.join(
          " "
        )}`
      );

      inputPaises.current.value = "";

      setCountryMap([]);

      setErrorHandler({});
    } else {
      setErrorHandler(locura);
    }
  }
  return (
    <div className="superDiv">
      {/* form para submitear con post */}
      <div className="antesSuperDiv">
        <div className="fede">
          {" "}
          <form onSubmit={(e) => ultimateSubmit(e)}>
            <div className="chau">
              <div>
                <label>Activity</label>
              </div>
              <input
                className={errorHandler.name && "error"}
                value={putActividad.name}
                placeholder="activity..."
                name="name"
                onChange={(e) => handleChange(e)}
              ></input>
              {errorHandler.name && (
                <h5 style={{ color: "red" }}>{errorHandler.name}</h5>
              )}
            </div>

            <div className="chau">
              <div>
                <label>Minutes</label>
              </div>
              <input
                className={errorHandler.duration && "error"}
                name="duration"
                placeholder="duration..."
                value={putActividad.duration}
                onChange={(e) => handleChange(e)}
              ></input>
              {errorHandler.duration && (
                <h5 style={{ color: "red", outlineColor: "red" }}>
                  {errorHandler.duration}
                </h5>
              )}
            </div>
            <div>
              <label>Difficulty</label>
            </div>
            <div className="chau">
              <select
                value={putActividad.difficulty}
                className={errorHandler.difficulty && "error"}
                name="difficulty"
                onChange={(e) => handleChange(e)}
              >
                <option value="Select Difficulty">Select Difficulty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errorHandler.difficulty && (
                <h5 style={{ color: "red" }}>{errorHandler.difficulty}</h5>
              )}
            </div>
            <div>
              <label>Season</label>
            </div>
            <div className="chau">
              <select
                value={putActividad.season}
                className={errorHandler.season && "error"}
                name="season"
                onChange={(e) => handleChange(e)}
              >
                <option value="Season">Ninguno</option>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
              </select>
              {errorHandler.season && (
                <h5 style={{ color: "red" }}>{errorHandler.season}</h5>
              )}
              <div>
                <button type="submit">Change!</button>
              </div>
            </div>
          </form>
        </div>
        <div className="fede">
          {" "}
          <div className="omori">
            <label>Select a Country!</label>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                ref={inputPaises}
                className={errorHandler.idCountry && "error"}
                onChange={(e) => handleInput(e)}
              ></input>
              <div className="fabri">
                {countryMap.length < 50
                  ? countryMap.map((e) => (
                      <h4 onClick={() => addCountry(e)}>{e}</h4>
                    ))
                  : []}
              </div>
              {errorHandler.idCountry && (
                <h5 style={{ color: "red" }}>{errorHandler.idCountry}</h5>
              )}
            </form>
          </div>
        </div>
        <div className="fede">
          <div className="overflow">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {putActividad.idCountry.map((e) => (
                <h5
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {e}
                  <button
                    className="buttonNoStyle"
                    onClick={() => deleteCountry(e)}
                  >
                    <svg
                      style={{ width: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </h5>
              ))}
            </div>
          </div>
        </div>

        {/* form elegir pais */}

        <h2>
          <Link to="/countries">go Back</Link>
        </h2>
      </div>
    </div>
  );
}

function error(parameter) {
  var error = {};
  if (!parameter.name) {
    error.name = "*este campo es obligatorio";
  }
  if (!parameter.duration) {
    error.duration = "*este campo es obligatorio";
  } else if (isNaN(parameter.duration)) {
    console.log(parameter.duration);
    error.duration = "*este campo debe tener UNICAMENTE numeros";
  }
  if (!parameter.difficulty || parameter.difficulty === "Select Difficulty") {
    error.difficulty = "*este campo es obligatorio";
  }
  if (!parameter.season || parameter.season === "Season") {
    error.season = "*este campo es obligatorio";
  }
  if (parameter.idCountry.length === 0) {
    error.idCountry = "*debes poner algun pais!";
  }
  console.log(parameter);

  console.log(error);
  return error;
}
