document.addEventListener("DOMContentLoaded", function () {
  var hamburger_menu;
  var big_wrapper;

  function declare() {
    big_wrapper = document.querySelector(".big-wrapper");
    hamburger_menu = document.querySelector(".hamburger-menu");

    // Verificar si los elementos están disponibles antes de agregar eventos
    if (hamburger_menu && big_wrapper) {
      events();
    } else {
      console.error("Uno o más elementos no se encuentran en el DOM.");
    }
  }

  // Función para manejar el menú hamburguesa
  function events() {
    hamburger_menu.addEventListener("click", () => {
      big_wrapper.classList.toggle("active");
    });
  }

  declare();  // Llamamos la función para inicializar todo
});



//=====================VALIDAR FORMULARIO===========================================
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("errorModal");
  const modalTitle = document.getElementById("modal-title");
  const modalIcon = document.getElementById("modal-icon");
  const errorMessage = document.getElementById("error-message");
  const closeModal = document.getElementById("closeModal");

  const formulario = document.getElementById("form");
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar envío automático del formulario

    // Validaciones
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("cel").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let errors = [];

    if (!nombre) {
      errors.push("Por favor ingrese su nombre.");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      errors.push("Por favor ingrese un email válido.");
    }

    if (celular.length !== 10 || isNaN(celular)) {
      errors.push("El número de celular debe tener 10 caracteres numéricos.");
    }

    if (!mensaje) {
      errors.push("Por favor ingrese un mensaje.");
    }

    // Mostrar errores o éxito
    if (errors.length > 0) {
      modalTitle.textContent = "Error";
      modalIcon.className = "bi bi-x-circle-fill"; // Icono de error
      modalIcon.style.color = "#e74c3c"; // Rojo
      errorMessage.innerHTML = `<ol>${errors.map(err => `<li>${err}</li>`).join("")}</ol>`;
      modal.style.display = "flex"; // Mostrar modal
    } else {
      modalTitle.textContent = "¡Éxito!";
      modalIcon.className = "bi bi-check-circle-fill"; // Icono de éxito
      modalIcon.style.color = "#2ecc71"; // Verde
      errorMessage.textContent = "El formulario se ha enviado correctamente.";
      modal.style.display = "flex"; // Mostrar modal
      formulario.reset(); // Limpiar el formulario
    }
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none"; // Ocultar modal
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none"; // Ocultar modal al hacer clic fuera
    }
  });
});
