const fs = require("fs");

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

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const products = await this.getProducts();
    const coderepit = products.find((product) => product.code === code);
    if (coderepit) {
      console.log("This Code does exist!");
      return;
    }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("You must complete all fields");
      return;
    }
    const product = {
      id: products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    products.push(product);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
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
      const event = result.find((product) => product.id === id);
      if (!event) {
        console.log("Product not found");
        return;
      }
      // console.log(result.findIndex(JSON.stringify(event)));

      // result[index][campo] = newDate;

      // return console.log(result);

      let llaveValor = Object.entries(event);

      let soloValores = Object.values(event);

      if (llaveValor[1][0] === campo) {
        event.title = newDate;
        return event;
      }
      if (llaveValor[2][0] === campo) {
        event.description = newDate;
        return event;
      }
      if (llaveValor[3][0] === campo) {
        event.price = newDate;
        return event;
      }
      if (llaveValor[4][0] === campo) {
        event.thumbnail = newDate;
        return event;
      }
      if (llaveValor[5][0] === campo) {
        event.code = newDate;
        return event;
      }
      if (llaveValor[6][0] === campo) {
        event.stock = newDate;
        return event;
      }
      const product = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const products = await this.getProducts();

      products.push(product);

      // await fs.promises.writeFile(
      //   this.path,
      //   JSON.stringify(products, null, "\t")
      // );
      // return product;
    }
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      const event = result.find((product) => product.id === id);

      console.log(event);
      console.log(result);

      let newArray = result.filter((elemento) => !elemento.id == event.id);

      products.push(newArray);

      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      //completar
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

const productManager = new ProductManager();

const consulta = async () => {
  let primeraConsulta = await productManager.getProducts();
  console.log("------------------");
  console.log(primeraConsulta + "     Esta consulta primero sale vacía.");
  console.log("------------------");
  // await productManager.addProduct(
  //   "Primer Producto Manaos",
  //   "Prueba con manaos 2 litros",
  //   200,
  //   "https://google.com",
  //   22,
  //   130
  // );
  console.log("------------------");
  console.log("--Consulta con producto por ID----");
  console.log("------------------");

  console.log(await productManager.getProductById(1));

  console.log("------------------");
  console.log("--Consulta con producto modificado----");
  console.log("------------------");

  //para modificar poroducto, agregar primer parametro id, segundo el campo a modificar, y tercero su valor.

  //await productManager.updateProduct(1, "price", 1600);

  //await productManager.deleteProduct(2);
};

module.exports = ProductManager;

//consulta();
