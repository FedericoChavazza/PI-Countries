import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCountries, getCountries } from "../../actions";

export function Tourism() {
  var country = useSelector((state) => state.countries);
  var dispatch = useDispatch();

  const [inputCountries, setinputCountries] = useState("");
  const [postCountry, setPostCountry] = useState({
    idCountry: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  useEffect(() => {
    var arraySUPREMO = country || [];
    var filterArray = arraySUPREMO.filter(
      (e) => e.name.toLowerCase() === inputCountries.toLowerCase()
    );
    if (filterArray.length !== 0) {
      for (let key in filterArray) {
        postCountry.idCountry.push(filterArray[key].id);
      }
    }
  }, [inputCountries]);

  function handlerInput(event) {
    setinputCountries(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postCountries(postCountry));
    dispatch(getCountries(inputCountries));
  }

  function handleChange(event) {
    setPostCountry((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function deleteCountry(pais) {
    var filtradoSUPREMO = postCountry.idCountry.filter((e) => e !== pais);
    console.log(filtradoSUPREMO);
    setPostCountry((prevState) => {
      return {
        ...prevState,
        idCountry: filtradoSUPREMO,
      };
    });
  }
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name..."
          name="name"
          value={postCountry.name}
          onChange={(event) => handleChange(event)}
        ></input>
        <label>Difficulty</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Specific problem..."
          value={postCountry.difficulty}
          onChange={(event) => handleChange(event)}
        ></input>
        <label>Duration</label>
        <select name="duration" onChange={(event) => handleChange(event)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label>Season</label>
        <select name="season" onChange={(event) => handleChange(event)}>
          <option value="Ninguno">Ninguno</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
        <button type="submit">Submit!</button>
        <label>Country</label>
        <input onChange={(event) => handlerInput(event)}></input>
        <ul>
          {postCountry.idCountry.map((e) => (
            <li>
              {e}
              <button onClick={(e) => deleteCountry(e)}>x</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
