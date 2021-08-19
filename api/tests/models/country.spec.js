const { Country, Activity, conn } = require("../../src/db");
const { expect } = require("chai");

describe("Model Testing", function () {
  describe("Country model", function () {
    beforeEach(async function () {
      await Activity.sync({ force: true });
    });
  });
  describe("Country model", function () {
    beforeEach(async function () {
      await Country.sync({ force: true });
    });
    it("No debería crearlo si no recibe un name", (done) => {
      Country.create({ id: "122333434" })
        .then(() => done(new Error("La propiedad name es obligatoria")))
        .catch(() => done());
    });
  });
});
