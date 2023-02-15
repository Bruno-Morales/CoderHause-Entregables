class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const coderepit = this.products.find((event) => event.code === code);

    if (coderepit) {
      console.log("This Code does exist!");
      return;
    }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("You must complete all fields");
      return;
    }

    const event = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(event);
  };

  getProductById = (id) => {
    const event = this.products.find((event) => event.id === id);

    if (!event) {
      console.log("Product not found");
      return;
    }
    return console.log(event);
  };
}

const productManager = new ProductManager();

productManager.addProduct(
  "Coca cola",
  "Coca cola de 1 Litro retornable",
  250,
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
  9,
  100
);
productManager.addProduct(
  "Sprite",
  "Sprite retornable",
  350,
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
  10,
  800
);

productManager.addProduct(
  "Manaos",
  "Manaos de 1 Litro retornable",
  150,
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
  11,
  80
);

//Prueba de productos,

console.log(productManager.products);

// SI se agrega Otro producto con el Mismo codigo. Arroja primero el mensaje "This Code does exist!".

//productManager.addProduct(
// "Manaos",
// "Manaos de 1 Litro retornable",
//  150,
//  "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
//  11,
//  80
//);

// console.log(productManager.products);

//Prueba de productos por ID

productManager.getProductById(2);
