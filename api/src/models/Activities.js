const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("activities", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ["1", "2", "3", "4", "5"],
    },
    season: {
      type: DataTypes.ENUM,
      values: ["Verano", "Otoño", "Invierno", "Primavera"],
    },
    duration: {
      type: DataTypes.TEXT,
    },
  });
};

//ID
//Nombre
//Dificultad (Entre 1 y 5)
//Duración
//Temporada (Verano, Otoño, Invierno o Primavera)
