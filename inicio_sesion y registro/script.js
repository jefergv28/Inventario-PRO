const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


//===VALIDACIÓN DEL FORMULARIO DE INICIO DE SESIÓN==========================================
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validación de campos vacíos
  if (username.trim() === "" || password.trim() === "") {
    abrirModal("Por favor, completa todos los campos");
    return;
  }

  // Validación de longitud mínima de la contraseña
  if (password.length < 8) {
    abrirModal("La contraseña debe tener al menos 8 caracteres");
    return;
  }

  abrirModal("Inicio de sesión exitoso");
});

//====VALIDACIÓN DEL FORMULARIO DE REGISTRO========================================================

document.getElementById('registro').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtención de los valores de los campos
  let username = document.getElementById('registerUsername').value;
  let emailElement = document.getElementById('registerEmail');
  let email = emailElement ? emailElement.value : undefined;
  let password = document.getElementById('registerPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let telefono = document.getElementById('registerPhone').value;

  // Validación de campos vacíos
  if (username.trim() === '' || email === undefined || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || telefono.trim() === '') {
    abrirModal('Por favor, completa todos los campos');
    return;
  }

  // Validación de formato de correo electrónico
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailPattern)) {
    abrirModal('Por favor, ingresa un email válido');
    return;
  }
  

  // Validación de longitud mínima de la contraseña
  if (password.length < 6) {
    abrirModal('La contraseña debe tener al menos 6 caracteres');
    return;
  }

  // Validación de coincidencia de contraseñas
  if (password !== confirmPassword) {
    abrirModal('Las contraseñas no coinciden');
    return;
  }

  abrirModal('Registro exitoso');
});

// Obtener el modal y los elementos
let modal = document.getElementById('modal');
let modalMessage = document.getElementById('modalMessage');
let modalIcon = document.getElementById('modalIcon');
let span = document.getElementsByClassName('close')[0];

// Función para mostrar el modal con el mensaje
function abrirModal(message) {
  modalMessage.textContent = message;

  // Verificar si el mensaje contiene "error" para mostrar el ícono de error
  if (message.toLowerCase().includes("error") || message.toLowerCase().includes("fallido")) {
    modalIcon.style.display = 'inline-block'; // Mostrar el ícono de error
  } else {
    modalIcon.style.display = 'none'; // Ocultar el ícono en mensajes sin error
  }

  modal.style.display = 'block';
  modal.classList.add('show'); // Activar la animación al mostrar
}

// Cerrar el modal cuando se hace clic en la (x)
span.onclick = function() {
  modal.style.display = 'none';
  modal.classList.remove('show'); // Remover la animación al cerrar
  modalIcon.style.display = 'none'; // Ocultar el ícono cuando se cierra
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
    modalIcon.style.display = 'none';
  }
}
