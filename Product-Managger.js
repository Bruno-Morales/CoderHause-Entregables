const fs = require("fs");
const socket = require("./socket");

class ProductManager {
  constructor() {
    this.path = "./files/Products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } else {
      return [];
    }
  };

  addProduct = async (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category
  ) => {
    const products = await this.getProducts();
    const coderepit = products.find((product) => product.code === code);
    if (coderepit) {
      console.log("This Code does exist!");
      return;
    }

    if (
      !title ||
      !description ||
      !price ||
      !thumbnails ||
      !code ||
      !stock ||
      !category
    ) {
      console.log("You must complete all fields");
      return;
    }
    const product = {
      id: products.length + 1,
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category,
    };

    products.push(product);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );

    socket.io.emit("product_added", product);

    return product;
  };

  getProductById = async (id) => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      const event = result.find((product) => product.id === id);
      if (!event) {
        console.log("Product not found");
        return;
      }
      return event;
    }
  };

  updateProduct = async (id, campo, newDate) => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      if (!id || !campo || !newDate) {
        console.log(
          "Debe completar todos los campos: campo a editar y nuevo dato."
        );
        return;
      }
      const index = result.findIndex((product) => product.id === id);
      if (!result[index]) {
        return undefined;
      }
      result[index][campo] = newDate;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(result, null, "\t")
      );
      return true;
    }
  };

  deleteProduct = async (id) => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      const event = result.find((product) => product.id === id);
      const productIndex = result.findIndex((product) => product.id === id);
      if (event) {
        let newArray = result.filter((product) => product.id !== event.id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newArray, null, "\t")
        );
        socket.io.emit("product_delete", productIndex);
        return true;
      }
      if (!event) {
        return false;
      }
    }
  };

  // updateProduct = async (id, campo, newDate) => {
  //   if (fs.existsSync(this.path)) {
  //     const data = await fs.promises.readFile(this.path, "utf-8");
  //     const result = JSON.parse(data);
  //     const event = result.find((product) => product.id === id);
  //     if (!event) {
  //       console.log("Product not found");
  //       return;
  //     }
  //     let llaveValor = Object.entries(event);
  //     let soloValores = Object.values(event);

  //     for (let i = 0; i < llaveValor.length; i++) {
  //       if (llaveValor[i][0] === campo) {
  //         llaveValor[i][0] = campo;
  //         //aca pruebo agregandolo pero se agrega al final de todo
  //         //await fs.promises.appendFile(this.path, newDate);
  //         //aca pruebo asignandole el nuevo valor, pero no se retorna.
  //         event.campo = newDate;
  //         console.log(event);
  //       }
  //     }
  //   }
  // };
}

const consulta = async () => {
  //para modificar poroducto, agregar primer parametro id, segundo el campo a modificar, y tercero su valor.
  // await productManager.updateProduct(2, "title", "Nuevo titulo1");
  //await productManager.deleteProduct(2);
};

//consulta();

module.exports = ProductManager;
