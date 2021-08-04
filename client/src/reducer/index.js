const initialState = {
  countries: [],
  detailCountries: {},
  ordererCountries: [],
  ordererPopulation: [],
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
    case "ORDER_COUNTRIES":
      return {
        ...state,
        ordererCountries: action.payload,
      };
    case "ORDER_POPULATION":
      return {
        ...state,
        ordererPopulation: action.payload,
      };
    default:
      return state;
  }
};

export default country;
