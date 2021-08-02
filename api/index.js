//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

    var arreglo = axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((promise) => {
        var vivalapatria = promise.data;
        vivalapatria = vivalapatria.map((e) => {
          return {
            id: e.alpha3Code,
            name: e.name,
            img: e.flag,
            capital: e.capital,
            continent: e.region,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          };
        });
        // Country.bulkCreate(vivalapatria);
        vivalapatria.forEach((e) => Country.create(e));
      });
  });
});
