import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCountries, getCountries } from "../../actions";
import { Link } from "react-router-dom";
import style from "../Countries/Countries.css";

export function Tourism() {
  var country = useSelector((state) => state.countries);
  var dispatch = useDispatch();

  const [countryInput, setCountryInput] = useState("");
  const [countryMap, setCountryMap] = useState([]);
  const [postCountry, setPostCountry] = useState({
    idCountry: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  useEffect(() => {
    var info = country;
    var data = [];
    for (let i = 0; i < country.length; i++) {
      data.push(info[i].name.toLowerCase());
      setCountryMap(data);
    }
  }, [country]);

  function handleChange(e) {
    setPostCountry({ ...postCountry, [e.target.name]: e.target.value });
  }

  function handleInput(e) {
    setCountryInput(e.target.value);
    dispatch(getCountries(e.target.value));
  }

  function addCountry(e) {
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
        if (postCountry.idCountry.includes(dataKey[0])) {
          console.log(postCountry.idCountry);
          return;
        } else {
          console.log(dataKey);
          return setPostCountry({
            ...postCountry,
            idCountry: [...postCountry.idCountry, ...dataKey],
          });
        }
      }
    }
  }

  function deleteCountry(pais) {
    let filtradoSUPREMO = postCountry.idCountry.filter((e) => e !== pais);
    console.log("hola", filtradoSUPREMO);
    setPostCountry((prevState) => {
      return {
        ...prevState,
        idCountry: filtradoSUPREMO,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountries(countryInput));
  }

  function ultimateSubmit(e) {
    e.preventDefault();
    dispatch(postCountries(postCountry));
  }
  return (
    <div className="superDiv">
      {/* form para submitear con post */}
      <div className="antesSuperDiv">
        <div className="fede">
          {" "}
          <form onSubmit={(e) => ultimateSubmit(e)}>
            <div className="chau">
              <label>Activity</label>
              <input
                value={postCountry.name}
                placeholder="activity..."
                name="name"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="chau">
              <label>Minutes</label>
              <input
                name="duration"
                placeholder="duration..."
                value={postCountry.duration}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="chau">
              <select name="difficulty" onChange={(e) => handleChange(e)}>
                <option value="Select Difficulty">Select Difficulty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="chau">
              <select name="season" onChange={(e) => handleChange(e)}>
                <option value="Season">Ninguno</option>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
              </select>
              <button type="submit">Submit!</button>
            </div>
          </form>
        </div>
        <div className="fede">
          {" "}
          <div className="omori">
            <label>Select a Country!</label>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input onChange={(e) => handleInput(e)}></input>
              <div className="fabri">
                {countryMap.length < 50
                  ? countryMap.map((e) => (
                      <h4 onClick={() => addCountry(e)}>{e}</h4>
                    ))
                  : []}
              </div>
            </form>
          </div>
        </div>
        <div className="fede">
          <div className="overflow">
            <div>
              {postCountry.idCountry.map((e) => (
                <h5>
                  {e}
                  <button onClick={() => deleteCountry(e)}>x</button>
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
