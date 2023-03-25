const socket = io();

socket.on("product_added", (data) => {
  const productsContainer = document.getElementById("productsNew");
  productsContainer.innerHTML += `${data.title}</br>`;
});
