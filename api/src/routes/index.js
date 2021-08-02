const express = require("express");
const router = express.Router();
const { Country, Activities } = require("../db");
const { Sequelize, Op } = require("sequelize");

router.use(express.json());
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", async function (req, res, next) {
  try {
    const { name } = req.query;

    if (name) {
      var promesaNombre = await Country.findAll({
        attributes: ["name", "img", "capital", "continent", "id"],
      });
      var filter = promesaNombre.filter((search) => {
        var boolean = true;
        for (let i = 0; i < name.length; i++) {
          if (
            name.charAt(i).toLowerCase() !== search.name.charAt(i).toLowerCase()
          ) {
            boolean = false;
          }
        }
        if (boolean) {
          return search;
        }
      });
      return res.json(filter.length !== 0 ? filter : "Country Not Found!");
    } else {
      var promesaNombre = await Country.findAll({
        attributes: ["name", "img", "capital", "continent", "id"],
      });
      return res.json(promesaNombre);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/countries/:idCountry", async function (req, res, next) {
  try {
    if (req.params.idCountry) {
      var idFound = await Country.findByPk(req.params.idCountry);
      return res.send(idFound ? idFound : "Country not");
    } else {
      ("xD");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/activity", async function (req, res, next) {
  try {
    const { name, difficulty, duration, season } = req.body;
    let [activity, created] = await Activities.findOrCreate({
      where: {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
      },
      default: {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
      },
    });

    res.json({ activity, created });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
