const productsModel = require("../../dao/model/products.model.js");

const productController = {
  index: async (req, res) => {
    if (!req.session.userLogged) {
      return res.redirect("login");
    }
    //para entrar como administrador

    let page = parseInt(req.query.page);
    //  Agregando en la consulta http://localhost:8080/products/?limit=1  Arroja la cantidad de limites que se busca.
    let limit = req.query.limit;
    //agregando en la consulta       "http://localhost:8080/products/?sort=1"   <-- en 1 arroja mayor precio.
    //Agregando en la consulta un -1 "http://localhost:8080/products/?sort=-1"    arroja precios de menor a mayor.
    let sort = req.query.sort;

    if (!page) page = 1;

    let result = await productsModel.paginate(
      {},
      {
        page,
        limit: limit ?? 10,
        sort: { price: sort },
        lean: true,
      }
    );

    result.prevLink = result.hasPrevPage
      ? `http://localhost:8080/products/?page=${result.prevPage}`
      : "";
    result.nextLink = result.hasNextPage
      ? `http://localhost:8080/products/?page=${result.nextPage}`
      : "";
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.render("products", result);
  },

  productsCreate: async (req, res) => {
    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      thumbnails: req.body.thumbnails,
      code: req.body.code,
      stock: req.body.stock,
      category: req.body.category,
    };

    await productsModel.create(product);

    return res.send({ status: "Success" });
  },
  forId: async (req, res) => {
    let idNew = req.params.id;
    let result = await productsModel.findOne({ _id: idNew });
    res.render("productid", result);
  },
};

module.exports = productController;
