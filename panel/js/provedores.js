document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nuevoProveedorForm');
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  const footer = document.querySelector('footer'); // Obtener el footer

  // // Mostrar el footer cuando se cierre el modal
  // errorModal._element.addEventListener('hidden.bs.modal', () => {
  //   footer.classList.remove('hidden');  // Mostrar el footer
  // });

  // // Ocultar el footer cuando se abra el modal
  // errorModal._element.addEventListener('shown.bs.modal', () => {
  //   footer.classList.add('hidden');  // Ocultar el footer
  // });

  let editingRow = null; // Variable para almacenar la fila en edición
  const formButton = form.querySelector('button'); // Botón de envío
  const formStatus = document.createElement('div'); // Elemento para mostrar el mensaje de estado
  formStatus.style.marginTop = '15px'; // Estilo básico
  formStatus.style.fontSize = '25px'; //
  form.appendChild(formStatus); // Agregar el mensaje debajo del formulario

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

    // Si estamos editando una fila
    if (editingRow) {
      editingRow.querySelector('.nombre').textContent = nombre;
      editingRow.querySelector('td:nth-child(2)').textContent = telefono;
      editingRow.querySelector('td:nth-child(3)').textContent = email;

      // Cambiar el mensaje a "Proveedor modificado"
      formStatus.textContent = 'Proveedor modificado correctamente!';
      formStatus.style.color = '#6DBE45';

      // Cambiar el texto del botón a "Añadir Proveedor"
      formButton.textContent = 'Añadir Proveedor';

      // Limpiar la fila en edición
      editingRow = null;
    } else {
      // Crear una nueva fila en la tabla
      const table = document.querySelector('.table tbody');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="nombre">${nombre}</td>
        <td>${telefono}</td>
        <td>${email}</td>
        <td>
          <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
          <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-favorite"><i class="bi bi-heart"></i></button>
        </td>
      `;
      table.appendChild(row);

      // Cambiar el mensaje a "Proveedor añadido"
      formStatus.textContent = 'Proveedor añadido correctamente!';
      formStatus.style.color = '#4a90e2';
    }

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

      // Cargar los datos de la fila en el formulario para editar
      document.getElementById('nombre').value = nombre;
      document.getElementById('telefono').value = telefono;
      document.getElementById('email').value = email;

      // Establecer la fila actual como la fila en edición
      editingRow = row;

      // Cambiar el texto del botón a "Guardar Cambios"
      formButton.textContent = 'Guardar Cambios';
      
      // Cambiar el mensaje a "Modificando Proveedor"
      formStatus.textContent = 'Modificando proveedor...';
      formStatus.style.color = '#f29727';
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
