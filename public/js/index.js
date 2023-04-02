const socket = io();

const productsContainer = document.getElementById("productsNew");

socket.on("product_added", (data) => {
  let item = document.createElement("div");
  item.innerHTML = `<h2>${data.title}<h2></br>`;
  productsContainer.appendChild(item);
});
socket.on("product_delete", (data) => {
  productsContainer.removeChild(productsContainer.children[data]);
});
