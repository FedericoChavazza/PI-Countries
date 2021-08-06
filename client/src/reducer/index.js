const initialState = {
  countries: [],
  detailCountries: {},
};

const country = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "DETAILS_COUNTRY":
      return {
        ...state,
        detailCountries: action.payload,
      };
    default:
      return state;
  }
};

export default country;
