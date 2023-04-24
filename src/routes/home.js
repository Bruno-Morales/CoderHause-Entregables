var express = require("express");
var router = express.Router();
const userModel = require("../../dao/model/user.model.js");
// const ProductManager = require("../../Product-Managger");

// const productManager = new ProductManager();

router.get("/", async (req, res) => {
  let page = parseInt(req.query.page);

  if (!page) page = 1;
  //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,

  //esto hace que a Handlebars llegue el documento como plain object y no como Document.
  let result = await userModel.paginate({}, { page, limit: 10, lean: true });
  result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/?page=${result.prevPage}`
    : "";
  result.nextLink = result.hasNextPage
    ? `http://localhost:8080/?page=${result.nextPage}`
    : "";
  result.isValid = !(page <= 0 || page > result.totalPages);

  res.render("home", result);
});

router.post("/create", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;

  const user = {
    first_name,
    last_name,
    email,
  };

  await userModel.create(user);
  res.send({ status: "Success" });
  // let products = await productManager.getProducts();
  // //Para corroborar que no este la lista vacía.[0]
  // res.render("home", { products });
});

router.delete("/delete/:id", async (req, res) => {
  // const users = await userModel.find();
  // let product = req.params.id;
});

module.exports = router;
