var express = require("express");
var router = express.Router();
const multer = require("multer");
var path = require("path");

const ProductManager = require("../../Primer-Entregable");

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

//rutas para crear

router.post("/create", upload.single("img"), async (req, res) => {
  let image = "";
  if (req.file) {
    image = req.file.filename;
  }
  return res.send(image);
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

module.exports = router;
