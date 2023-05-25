const userModel = require("../../dao/model/user.model.js");

const indexController = {
  index: async (req, res) => {
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

    res.send(result);
  },
  userCreate: async (req, res) => {
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
  },
  delete: async (req, res) => {
    try {
      let idNew = req.params.id;
      let result = await userModel.findOne({ _id: idNew });
      userModel.deleteMany({ result });
      return res.send({ status: "Success" });
    } catch (error) {
      return console.log(error);
    }
  },
};

module.exports = indexController;
