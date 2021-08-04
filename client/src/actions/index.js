import axios from "axios";

export function getCountries(name) {
  return function (dispatch) {
    console.log(name);
    return axios
      .get(`http://localhost:3001/countries?name=${name}`)
      .then((promise) => {
        dispatch({
          type: "GET_COUNTRIES",
          payload: promise.data,
        });
      });
  };
}

export function orderCountries(payload) {
  return {
    type: "ORDER_COUNTRIES",
    payload: payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_POPULATION",
    payload: payload,
  };
}

export function countryDetails(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((promise) => {
        dispatch({
          type: "DETAILS_COUNTRY",
          payload: promise.data,
        });
      });
  };
}
