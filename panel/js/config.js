// Obtener los elementos del modal
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalBtn = document.getElementsByClassName('close-btn')[0];

// Función para mostrar el modal con un mensaje
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

// Función para cerrar el modal
closeModalBtn.onclick = function() {
  modal.style.display = 'none';
}

// Función para cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Función para actualizar la foto de perfil (solo muestra el nombre del archivo)
const profilePictureInput = document.getElementById('profile-picture');
profilePictureInput.addEventListener('change', function() {
  const fileName = profilePictureInput.files[0]?.name || 'Sin archivo seleccionado';
  showModal(`Foto de perfil actualizada: ${fileName}`);
});

// Función para cambiar el nombre de usuario
const usernameInput = document.getElementById('username');
usernameInput.addEventListener('change', function() {
  showModal(`Nombre de usuario actualizado a: ${usernameInput.value}`);
});

// Función para cambiar el correo electrónico
const emailInput = document.getElementById('email');
emailInput.addEventListener('change', function() {
  showModal(`Correo electrónico actualizado a: ${emailInput.value}`);
});

// Función para manejar el formulario de configuración
const form = document.getElementById('settings-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Aquí podrías guardar los cambios en un servidor o base de datos
  showModal('Cambios guardados correctamente');
});

// Cambiar Contraseña
const passwordChangeButton = document.getElementById('password-change');

passwordChangeButton.addEventListener('click', function () {
  showModal('Redirigiendo a la página de cambio de contraseña...');
});
