document.addEventListener('DOMContentLoaded', function () {
  const openProductModalBtn = document.getElementById("openProductModalBtn");
  const productModal = document.getElementById("productModal");
  const closeModalBtn = document.querySelector(".close-btn");
  const productForm = document.getElementById("productForm");
  const productTableBody = document.querySelector(".product-list tbody");

  let editingProduct = null;

  // Función para abrir el modal
  openProductModalBtn.addEventListener("click", () => {
    productForm.reset();
    editingProduct = null;
    productModal.style.display = "block";
  });

  // Función para cerrar el modal
  closeModalBtn.addEventListener("click", () => {
    productModal.style.display = "none";
  });

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
  });

  // Función para simular la carga de productos
  function loadSampleProducts() {
    const sampleProducts = [
      {
        id: 1,
        name: "Smartphone",
        category: "Electrónica",
        quantity: 50,
        price: 699,
        description: "Último modelo de smartphone con características avanzadas.",
        inventory: "Inventario A"
      },
      {
        id: 2,
        name: "Batidora",
        category: "Hogar y Cocina",
        quantity: 30,
        price: 120,
        description: "Batidora multifuncional para todas tus recetas.",
        inventory: "Inventario B"
      },
      {
        id: 3,
        name: "Camiseta",
        category: "Ropa y Accesorios",
        quantity: 100,
        price: 25,
        description: "Camiseta de algodón 100% en varios colores.",
        inventory: "Inventario C"
      }
    ];

    sampleProducts.forEach(product => {
      addProductToTable(product);
    });
  }

  // Función para agregar producto a la tabla
  function addProductToTable(product) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td class="product-name">${product.name}</td>
      <td>${product.category}</td>
      <td>${product.quantity}</td>
      <td>$${product.price}</td>
      <td>${product.description}</td>
      <td>${product.inventory}</td>
      <td>
        <button class="edit-btn"><i class="bi bi-pencil"></i></button>
        <button class="delete-btn"><i class="bi bi-trash"></i></button>
        <button class="favorite-btn"><i class="bi bi-heart"></i></button>
      </td>
    `;
    productTableBody.appendChild(row);

    // Agregar funcionalidad a los botones
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    const favoriteBtn = row.querySelector('.favorite-btn');

    editBtn.addEventListener('click', () => {
      editingProduct = row;
      productForm.productName.value = product.name;
      productForm.productCategory.value = product.category;
      productForm.productQuantity.value = product.quantity;
      productForm.productPrice.value = product.price;
      productForm.productDescription.value = product.description;
      productForm.inventorySelect.value = product.inventory;
      productModal.style.display = "block";
    });

    deleteBtn.addEventListener('click', () => {
      row.remove();
    });

    favoriteBtn.addEventListener('click', () => {
      favoriteBtn.classList.toggle('active');
      const productNameCell = row.querySelector('.product-name');
      if (favoriteBtn.classList.contains('active')) {
        favoriteBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        productNameCell.innerHTML += ' <i class="bi bi-heart-fill favorite-icon"></i>';
      } else {
        favoriteBtn.innerHTML = '<i class="bi bi-heart"></i>';
        const favoriteIcon = productNameCell.querySelector('.favorite-icon');
        if (favoriteIcon) {
          favoriteIcon.remove();
        }
      }
    });
  }

  // Cargar productos de ejemplo al cargar la página
  loadSampleProducts();

  // Función para manejar el envío del formulario
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
      id: editingProduct ? editingProduct.querySelector('td').textContent : Date.now(), // Mantener ID original si se está editando
      name: productForm.productName.value,
      category: productForm.productCategory.value,
      quantity: productForm.productQuantity.value,
      price: productForm.productPrice.value,
      description: productForm.productDescription.value,
      inventory: productForm.inventorySelect.value
    };

    if (editingProduct) {
      editingProduct.querySelector('.product-name').textContent = newProduct.name;
      editingProduct.querySelectorAll('td')[2].textContent = newProduct.category;
      editingProduct.querySelectorAll('td')[3].textContent = newProduct.quantity;
      editingProduct.querySelectorAll('td')[4].textContent = `$${newProduct.price}`;
      editingProduct.querySelectorAll('td')[5].textContent = newProduct.description;
      editingProduct.querySelectorAll('td')[6].textContent = newProduct.inventory;
    } else {
      addProductToTable(newProduct);
    }

    productModal.style.display = "none";
    productForm.reset();
    editingProduct = null;
  });
});
