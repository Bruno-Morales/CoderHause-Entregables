var express = require("express");
var router = express.Router();
const { faker } = require("@faker-js/faker/locale/es");

const mockingproductsController = {
  totalFaker: (req, res) => {
    const productoFaker = (title, price) => {
      if (title === undefined || title === null) {
        console.log(
          ` error: ❌ Failed. Received ${title} but expected '*Titulo del Producto*'`
        );
        return res.send({
          status: "error",
          message: ` error: ❌ Failed. Received ${title} but expected '*Titulo del Producto*'`,
        });
      }
      if (price === undefined || price === null) {
        console.log(
          ` error: ❌ Failed. Received ${price} but expected '*price*'`
        );
        return res.send({
          status: "error",
          message: ` error: ❌ Failed. Received ${price} but expected '*price*'`,
        });
      }

      return {
        code: faker.string.alphanumeric(8),
        title: title,
        description: faker.commerce.productDescription(),
        price: price,
        category: faker.commerce.product(),
        stock: faker.number.int({ min: 0, max: 100 }),
        thumbnails: faker.image.url(),
      };
    };

    let numerodeProductos = 50;

    let products = [];

    for (let i = 0; i < numerodeProductos; i++) {
      let title = faker.commerce.productName();
      let price = faker.commerce.price();
      products.push(productoFaker(title, price));
    }

    return res.send({ status: "ok", pyload: products });
  },
};

module.exports = mockingproductsController;
