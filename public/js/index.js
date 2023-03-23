const socket = io();

const products = document.getElementById("productsNew");

socket.on("product_added", (data) => {
  console.log(data);
});
