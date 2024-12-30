document.addEventListener('DOMContentLoaded', () => {
    const nuevaListaBtn = document.getElementById('nueva-lista-btn');
    const listasContainer = document.querySelector('.listas');
    const template = document.getElementById('tarjeta-template').content;
  
    // Cargar favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
    // Función para renderizar favoritos
    function renderFavoritos() {
      listasContainer.innerHTML = '';
      favoritos.forEach((item, index) => {
        const clone = template.cloneNode(true);
        clone.querySelector('img').src = item.img || 'https://via.placeholder.com/150';
        clone.querySelector('h3').textContent = item.nombre;
        clone.querySelector('.eliminar-btn').addEventListener('click', () => eliminarFavorito(index));
        listasContainer.appendChild(clone);
      });
    }
  
    // Agregar un nuevo favorito
    nuevaListaBtn.addEventListener('click', () => {
      const nombre = prompt('Nombre del producto:');
      const img = prompt('URL de la imagen:');
      if (nombre) {
        favoritos.push({ nombre, img });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        renderFavoritos();
      }
    });
  
    // Eliminar favorito
    function eliminarFavorito(index) {
      favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      renderFavoritos();
    }
  
    // Renderizar favoritos al cargar la página
    renderFavoritos();
  });
  