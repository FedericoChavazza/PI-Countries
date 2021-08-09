import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCountries, getCountries } from "../../actions";
import { Link } from "react-router-dom";

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
  }
  const dataKey = [];
  function addCountry(e) {
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
          return;
        } else {
          setPostCountry({
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
    <div>
      <div>
        {postCountry.idCountry.map((e) => (
          <h5>
            {e}
            <button onClick={() => deleteCountry(e)}>x</button>
          </h5>
        ))}
      </div>
      {/* form para submitear con post */}
      <form onSubmit={(e) => ultimateSubmit(e)}>
        <label>Activity</label>
        <input
          value={postCountry.name}
          placeholder="activity..."
          name="name"
          onChange={(e) => handleChange(e)}
        ></input>
        <label>Minutes</label>
        <input
          name="duration"
          placeholder="duration..."
          value={postCountry.duration}
          onChange={(e) => handleChange(e)}
        ></input>
        <select name="difficulty" onChange={(e) => handleChange(e)}>
          <option value="Select Difficulty">Select Difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select name="season" onChange={(e) => handleChange(e)}>
          <option value="Season">Ninguno</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
        <button type="submit">Submit!</button>
      </form>
      {/* form elegir pais */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => handleInput(e)}></input>
        <div>
          {countryMap.length < 50
            ? countryMap.map((e) => (
                <h4>
                  {e}
                  <button onClick={() => addCountry(e)}>+</button>
                </h4>
              ))
            : []}
        </div>
        <button type="submit">Search!</button>
      </form>
      <h2>
        <Link to="/countries">go Back</Link>
      </h2>
    </div>
  );
}
