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
        include: Activities,
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
      return res.json(filter.length !== 0 ? filter : []);
    } else {
      var promesaNombre = await Country.findAll({ include: Activities });
      return res.json(promesaNombre);
    }
  } catch (error) {
    next({ msg: "an error has ocurred", status: 500 });
  }
});

router.get("/countries/:idCountry", async function (req, res, next) {
  try {
    if (req.params.idCountry) {
      var idFound = await Country.findByPk(req.params.idCountry, {
        include: Activities,
      });
      return res.json(
        idFound
          ? idFound
          : { msg: "The key does not belong to an existing country" }
      );
    } else {
      res
        .sendStatus(404)
        .json({ msg: "In order to search by ID, you have to enter a key!" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/activity", async function (req, res, next) {
  try {
    const { idCountry, name, difficulty, duration, season } = req.body;
    let [activity] = await Activities.findOrCreate({
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
    await activity.setCountries(idCountry); //[ARG, BOL, PER]
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

router.put("/put", async function (req, res, next) {
  try {
    const { activity } = req.body;
    let obj = {};
    obj = activity;
    console.log(obj);

    var id = await Activities.findByPk(obj.idActivity);
    if (id) {
      await id.update({
        name: obj.name,
        difficulty: obj.difficulty,
        duration: obj.duration,
        season: obj.season,
      });
    }
    if (id) {
      await id.setCountries(obj.idCountry);
      res.json(obj);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/activities/:id", async function (req, res, next) {
  try {
    if (req.params.id) {
      var idFound = await Activities.findByPk(req.params.id, {
        include: Country,
      });
      console.log(idFound);
      return res.json(
        idFound
          ? idFound
          : { msg: "The key does not belong to an existing activity" }
      );
    } else {
      res
        .sendStatus(404)
        .json({ msg: "In order to search by ID, you have to enter a key!" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
