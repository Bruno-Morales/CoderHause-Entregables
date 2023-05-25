window.onload = function () {
  let form = document.querySelector(".form-login");
  form.email.focus();
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = [];

    let email = document.querySelector(".email");
    let pass = document.querySelector(".pass");

    if (email.value == "") {
      errors.push("El email no puede estar vacio");
    }
    if (pass.value == "") {
      errors.push("La contraseña no puede estar vacía");
    }

    if (errors.length > 0) {
      let losErrores = document.querySelector(".errors");
      losErrores.style.color = "red";
      losErrores.innerHTML = "";
      for (let i = 0; i < errors.length; i++) {
        losErrores.innerHTML += `<li>${errors[i]}</li>`;
      }
    } else {
      form.submit();
    }
  });
};
