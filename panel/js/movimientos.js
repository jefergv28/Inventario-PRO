document.addEventListener('DOMContentLoaded', function () {
    const movementTableBody = document.querySelector(".historial-list tbody");
  
    // Función para agregar movimiento al historial
    function addMovementToHistorial(movement) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${movement.id}</td>
        <td>${movement.action}</td>
        <td>${movement.item}</td>
        <td>${movement.date}</td>
        <td>${movement.time}</td>
      `;
      movementTableBody.appendChild(row);
    }
  
    // Función para cargar movimientos de ejemplo
    function loadSampleMovements() {
      const sampleMovements = [
        {
          id: 1,
          action: "Creación de Producto",
          item: "Laptop",
          date: "2024-04-01",
          time: "10:30 AM"
        },
        {
          id: 2,
          action: "Creación de Inventario",
          item: "Almacén Central",
          date: "2024-04-02",
          time: "02:45 PM"
        },
        {
          id: 3,
          action: "Entrada de Producto",
          item: "Mouse",
          date: "2024-04-03",
          time: "09:15 AM"
        }
      ];
  
      sampleMovements.forEach(movement => {
        addMovementToHistorial(movement);
      });
    }
  
    // Cargar movimientos de ejemplo al cargar la página
    loadSampleMovements();
  
    
    // Función para descargar en Excel
    document.getElementById('downloadExcelBtn').addEventListener('click', function () {
      const ws = XLSX.utils.table_to_sheet(document.querySelector('.historial-list table'));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Historial de Movimientos');
      XLSX.writeFile(wb, 'historial_movimientos.xlsx');
    });
  });
  