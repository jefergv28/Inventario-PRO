document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("inventoryModal");
  const closeModalBtn = document.querySelector(".close-btn");
  const inventoryForm = document.getElementById("inventoryForm");
  const inventoryTable = document.querySelector(".inventory-list tbody");
  let editMode = false;
  let editRow = null;

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    inventoryForm.reset();
    clearErrorMessages();
    editMode = false;
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  inventoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrorMessages();
    const inventoryName = document.getElementById("inventoryName").value.trim();
    const inventoryType = document.getElementById("inventoryType").value;
    const inventoryDescription = document.getElementById("inventoryDescription").value.trim();

    let valid = true;

    if (inventoryName === "") {
      nameError.innerHTML = `<b> * El nombre del inventario es requerido.</b>`;
      nameError.style.display = "block";
      valid = false;
    }

    if (inventoryType === "") {
      typeError.innerHTML = `<b> * El tipo de inventario es requerido</b>`;
      typeError.style.display = "block";
      valid = false;
    }

    if (!valid) {
      return;
    }

    if (editMode) {
      editRow.children[1].querySelector('.inventory-name').textContent = inventoryName;
      editRow.children[2].textContent = inventoryType;
      editRow.children[3].textContent = inventoryDescription;
    } else {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${inventoryTable.children.length + 1}</td>
        <td><span class="inventory-name">${inventoryName}</span></td>
        <td>${inventoryType}</td>
        <td>${inventoryDescription}</td>
        <td>
          <button class="edit-btn"><i class="bi bi-pencil-fill modificar"></i></button>
          <button class="delete-btn"><i class="bi bi-trash-fill eliminar"></i></button>
          <button class="favorite-btn"><i class="bi bi-heart no-favorito"></i></button>
        </td>
      `;
      inventoryTable.appendChild(newRow);
      agregarEventosAccion(newRow);
    }

    modal.style.display = "none";
  });

  // Función para limpiar mensajes de error
  function clearErrorMessages() {
    nameError.style.display = "none";
    typeError.style.display = "none";
  }

  // Función para manejar la acción de modificar
  function modificarFila(event) {
    const fila = event.target.closest('tr');
    const inventoryName = fila.children[1].querySelector('.inventory-name').textContent;
    const inventoryType = fila.children[2].textContent;
    const inventoryDescription = fila.children[3].textContent;

    document.getElementById("inventoryName").value = inventoryName;
    document.getElementById("inventoryType").value = inventoryType;
    document.getElementById("inventoryDescription").value = inventoryDescription;

    modal.style.display = "block";
    editMode = true;
    editRow = fila;
  }

  // Función para manejar la acción de eliminar
  function eliminarFila(event) {
    const fila = event.target.closest('tr');
    fila.remove(); // Remueve la fila de la tabla
    // Añade aquí la lógica para eliminar la fila en tu backend
  }

  // Función para manejar la acción de marcar como favorito
  function marcarFavorito(event) {
    const fila = event.target.closest('tr');
    const nombreCelda = fila.querySelector('.inventory-name');
    const iconoFavorito = event.target;

    // Cambiar estado de favorito
    if (iconoFavorito.classList.contains('bi-heart-fill')) {
      iconoFavorito.classList.remove('bi-heart-fill');
      iconoFavorito.classList.add('bi-heart');
      // Remover el icono de favorito del nombre del inventario
      const favoritoEnNombre = nombreCelda.querySelector('.favorito-en-nombre');
      if (favoritoEnNombre) {
        nombreCelda.removeChild(favoritoEnNombre);
      }
    } else {
      iconoFavorito.classList.remove('bi-heart');
      iconoFavorito.classList.add('bi-heart-fill');
      // Añadir el icono de favorito al final del nombre del inventario si no existe
      if (!nombreCelda.querySelector('.favorito-en-nombre')) {
        const clonIconoFavorito = iconoFavorito.cloneNode(true);
        clonIconoFavorito.classList.add('favorito-en-nombre');
        nombreCelda.appendChild(clonIconoFavorito);
      }
    }
  }

