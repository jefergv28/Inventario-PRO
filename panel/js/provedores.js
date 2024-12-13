document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nuevoProveedorForm');
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  
    function showError(message) {
      document.getElementById('errorMessage').innerText = message;
      errorModal.show();
    }
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Obtener los datos del formulario
      const nombre = document.getElementById('nombre')?.value.trim();
      const telefono = document.getElementById('telefono')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
  
      // Validación del nombre
      if (!nombre) {
        showError('Por favor, ingrese el nombre del proveedor.');
        return;
      }
  
      // Validación del teléfono (solo números)
      if (!/^\d+$/.test(telefono)) {
        showError('Por favor, ingrese un número de teléfono válido.');
        return;
      }
  
      // Validación del email (formato correcto)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('Por favor, ingrese un correo electrónico válido.');
        return;
      }
  
      // Crear una nueva fila en la tabla
      const table = document.querySelector('.table tbody');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><span class="nombre">${nombre}</span></td>
        <td>${telefono}</td>
        <td>${email}</td>
        <td>
          <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
          <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-favorite"><i class="bi bi-heart"></i></button>
        </td>
      `;
      table.appendChild(row);
  
      // Limpiar el formulario
      form.reset();
    });
  
    // Manejar edición, eliminación y favoritos de proveedor
    document.querySelector('.table tbody').addEventListener('click', (event) => {
      if (event.target.closest('.btn-danger')) {
        event.target.closest('tr').remove();
      }
  
      if (event.target.closest('.btn-primary')) {
        const row = event.target.closest('tr');
        const nombre = row.children[0].innerText;
        const telefono = row.children[1].innerText;
        const email = row.children[2].innerText;
  
        document.getElementById('nombre').value = nombre;
        document.getElementById('telefono').value = telefono;
        document.getElementById('email').value = email;
  
        row.remove();
      }
  
      if (event.target.closest('.btn-favorite')) {
        const button = event.target.closest('.btn-favorite');
        const row = button.closest('tr');
        const nombreCell = row.querySelector('.nombre');
  
        if (button.classList.toggle('active')) {
          button.innerHTML = '<i class="bi bi-heart-fill"></i>';
          nombreCell.innerHTML += ' <i class="bi bi-heart-fill favorite-icon"></i>';
        } else {
          button.innerHTML = '<i class="bi bi-heart"></i>';
          const favoriteIcon = nombreCell.querySelector('.favorite-icon');
          if (favoriteIcon) {
            favoriteIcon.remove();
          }
        }
      }
    });
  });
  