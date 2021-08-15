import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PutActivity } from "../../actions";

export function PutActivities(props) {
  const country = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [showActivities, setShowActivties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    idCountry: [],
    idActivity: [],
  });

  const [idState, setIdState] = useState("");

  useEffect(() => {
    console.log(country);
    const id = props.match.params.id;
    console.log(id);
    setIdState(id);
  }, [country]);

  function selectCountry(name) {}

  console.log(idState);
  return (
    <div>
      <form>
        <div>
          <input value={form.name} />
        </div>
        <div>
          <input value={form.duration} />
        </div>
        <div>
          <select value={form.difficulty}>
            <option defaultValue>Select Difficulty</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div>
          <select value={form.season}>
            <option defaultValue>Select Season</option>
            <option>Verano</option>
            <option>Otoño</option>
            <option>Invierno</option>
            <option>Primavera</option>
          </select>
        </div>
      </form>
      <div>
        {country.map((hola) => {
          var fede = hola.activities.find((e) => {
            return Number(idState) === Number(e.id);
          });
          if (fede) {
            console.log(hola.name);
            return (
              <h3>
                {hola.name}
                <button onClick={() => selectCountry(hola.name)}>X</button>
              </h3>
            );
          }
        })}
      </div>
    </div>
  );
}
