const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("country", {
    id: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    population: {
      type: DataTypes.FLOAT,
    },
  });
};

//ID (Código de 3 letras) *
//Nombre *
//Imagen de la bandera *
//Continente *
//Capital *
//Subregión
//Área
//Población

// 20210801144630
// https://restcountries.eu/rest/v2/name/Argentina

/*
[
  {
    "name": "Argentina",
    "topLevelDomain": [
      ".ar"
    ],
    "alpha2Code": "AR",
    "alpha3Code": "ARG",
    "callingCodes": [
      "54"
    ],
    "capital": "Buenos Aires",
    "altSpellings": [
      "AR",
      "Argentine Republic",
      "República Argentina"
    ],
    "region": "Americas",
    "subregion": "South America",
    "population": 43590400,
    "latlng": [
      -34.0,
      -64.0
    ],
    "demonym": "Argentinean",
    "area": 2780400.0,
    "gini": 44.5,
    "timezones": [
      "UTC-03:00"
    ],
    "borders": [
      "BOL",
      "BRA",
      "CHL",
      "PRY",
      "URY"
    ],
    "nativeName": "Argentina",
    "numericCode": "032",
    "currencies": [
      {
        "code": "ARS",
        "name": "Argentine peso",
        "symbol": "$"
      }
    ],
    "languages": [
      {
        "iso639_1": "es",
        "iso639_2": "spa",
        "name": "Spanish",
        "nativeName": "Español"
      },
      {
        "iso639_1": "gn",
        "iso639_2": "grn",
        "name": "Guaraní",
        "nativeName": "Avañe'ẽ"
      }
    ],
    "translations": {
      "de": "Argentinien",
      "es": "Argentina",
      "fr": "Argentine",
      "ja": "アルゼンチン",
      "it": "Argentina",
      "br": "Argentina",
      "pt": "Argentina",
      "nl": "Argentinië",
      "hr": "Argentina",
      "fa": "آرژانتین"
    },
    "flag": "https://restcountries.eu/data/arg.svg",
    "regionalBlocs": [
      {
        "acronym": "USAN",
        "name": "Union of South American Nations",
        "otherAcronyms": [
          "UNASUR",
          "UNASUL",
          "UZAN"
        ],
        "otherNames": [
          "Unión de Naciones Suramericanas",
          "União de Nações Sul-Americanas",
          "Unie van Zuid-Amerikaanse Naties",
          "South American Union"
        ]
      }
    ],
    "cioc": "ARG"
  }
]

*/
