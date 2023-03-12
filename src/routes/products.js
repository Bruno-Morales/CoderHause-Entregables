var express = require("express");
var router = express.Router();
const multer = require("multer");
var path = require("path");

const ProductManager = require("../../Product-Managger");

const productManager = new ProductManager();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/", upload.single("thumbnail"), async (req, res) => {
  const products = await productManager.getProducts();

  let image = "";
  if (req.file) {
    image = req.file.filename;
  }
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image,
    code: req.body.code,
    stock: req.body.stock,
    category: req.body.category,
  };

  let consulta1 = await productManager.addProduct(
    product.title,
    product.description,
    product.price,
    product.image,
    product.code,
    product.stock,
    product.category
  );

  return res.send(consulta1);
});

router.get("/", async (req, res) => {
  let limit = req.query.limit;

  let consulta = await productManager.getProducts();

  //Para corroborar que no este la lista vacía.

  if (!limit) {
    if (!consulta) {
      return res.send("No hay productos para mostrar");
    }
    res.send(consulta);
    return;
  }
  let parseado = JSON.parse(limit);

  let numeroreal = consulta[parseado - 1];

  const newconsult = consulta.splice(numeroreal, limit);

  res.send(newconsult);
});

router.get("/:id", async (req, res) => {
  let product = req.params.id;

  let segundaConsulta = await productManager.getProducts();

  let primeraConsulta = await productManager.getProductById(
    JSON.parse(product)
  );
  //console.log(primeraConsulta);
  //console.log(primeraConsulta.length);
  if (!segundaConsulta) {
    return res.send("No hay productos en el archivo.");
  }
  if (!primeraConsulta) {
    return res.send("No hay productos con ese ID.");
  }

  res.send(primeraConsulta);
});

router.put("/:id", async (req, res) => {
  let product = req.params.id;
  await productManager.updateProduct(
    JSON.parse(product),
    req.body.campo,
    req.body.newDate
  );
  res.send("Successfull");
});

router.delete("/:id", async (req, res) => {
  let product = req.params.id;
  await productManager.deleteProduct(JSON.parse(product));
  res.send("Successfull");
});

module.exports = router;
