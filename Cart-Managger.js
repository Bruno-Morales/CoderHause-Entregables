const fs = require("fs");

class CartManager {
  constructor() {
    this.path = "./files/Carts.json";
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } else {
      return [];
    }
  };

  addCart = async () => {
    const carts = await this.getCarts();

    const cart = {
      id: carts.length + 1,
      products: [
        {
          product: 0,
          quantity: 0,
        },
      ],
    };
    // const cart = {
    //   id: carts.length + 1,
    //   products: products.map((product) => {
    //     return { ...product, quantity: 1 };
    //   }),
    // };

    carts.push(cart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return carts;
  };

  addProductAtCart = async (id, pid) => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");

      const result = JSON.parse(data);

      const indexCart = result.findIndex((cart) => cart.id === id);

      const indexProduct = result[indexCart].products.findIndex(
        (cart) => cart.product === pid
      );

      if (indexProduct == -1) {
        const productNew = {
          product: JSON.parse(pid),
          quantity: 1,
        };

        result[indexCart].products.push(productNew);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(result, null, "\t")
        );

        return console.log("Successfull");
      }

      result[indexCart].products[indexProduct].quantity++;

      //console.log(indexProduct);
      // console.log(result[indexCart].products);
      // console.log(result[indexCart].products[indexProduct].quantity);
      // console.log(result[indexCart].products[0].quantity);
      // console.log(indexProduct);
      //result[indexCart].products[indexProduct].quantity
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(result, null, "\t")
      );
    }
    return console.log("Successfull");
  };

  getCartById = async (id) => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      const event = result.find((product) => product.id === id);
      if (!event) {
        return undefined;
      }
      return event;
    }
  };
}

module.exports = CartManager;
