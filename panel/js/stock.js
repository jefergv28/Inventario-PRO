document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('stockForm');
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  const productTable = document.getElementById('productTable');
  const formStatus = document.getElementById('formStatus');

  // Función para mostrar el error en el modal
  function showError(message) {
    document.getElementById('errorMessage').innerText = message;
    errorModal.show();
  }

  // Manejar la adición de nuevos productos
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreProducto = document.getElementById('nombreProducto').value.trim();
    const limiteStock = parseInt(document.getElementById('limiteStock').value.trim(), 10);

    if (!nombreProducto || !limiteStock) {
      showError('Por favor, ingrese el nombre del producto y el límite de stock.');
      return;
    }

    // Crear una nueva fila en la tabla de productos
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${nombreProducto}</td>
      <td>100</td> <td>${limiteStock}</td>
      <td>
        <button class="btn btn-danger"><i class="bi bi-trash"></i> Eliminar</button>
        <button class="btn btn-primary"><i class="bi bi-pencil"></i> Editar</button>
      </td>
    `;
    productTable.appendChild(row);

    // Crear elemento para el mensaje de éxito
    const messageElement = document.createElement('span');
    messageElement.textContent = 'Producto agregado correctamente.';
    messageElement.classList.add('success-message'); // Agrega una clase CSS para estilos personalizados
    formStatus.appendChild(messageElement);

    // Ocultar el mensaje automáticamente o al interactuar con el formulario
    const timeoutId = setTimeout(() => {
      messageElement.remove();
    }, 2000);

    form.addEventListener('focus', () => {
      clearTimeout(timeoutId);
      messageElement.remove();
    });

    // Limpiar el formulario
    form.reset();
  });

  // Manejar las acciones de eliminar y editar
  productTable.addEventListener('click', (event) => {
    if (event.target.closest('.btn-danger')) {
      event.target.closest('tr').remove();
    }

    if (event.target.closest('.btn-primary')) {
      const row = event.target.closest('tr');
      const nombreProducto = row.children[0].innerText;
      const limiteStock = row.children[2].innerText;

      document.getElementById('nombreProducto').value = nombreProducto;
      document.getElementById('limiteStock').value = limiteStock;
      row.remove();

      // Mostrar mensaje de éxito al editar
      const messageElement = document.createElement('span');
      messageElement.textContent = 'Editando producto.....';
      messageElement.classList.add('success-message');
      formStatus.appendChild(messageElement);

      const timeoutId = setTimeout(() => {
        messageElement.remove();
      }, 3000);

      form.addEventListener('focus', () => {
        clearTimeout(timeoutId);
        messageElement.remove();
      });
    }
  });
});