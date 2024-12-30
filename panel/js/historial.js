document.addEventListener("DOMContentLoaded", () => {
    const historialTable = document.querySelector("#historial-table tbody");
    const agregarAccesoBtn = document.getElementById("agregar-acceso-btn");
  
    // Datos de prueba iniciales
    const accesos = [
      { fecha: "2024-12-30 10:30 AM", usuario: "usuario1", accion: "Inicio de sesión", detalles: "IP: 192.168.0.1" },
      { fecha: "2024-12-30 11:00 AM", usuario: "usuario2", accion: "Cierre de sesión", detalles: "IP: 192.168.0.2" },
      { fecha: "2024-12-30 11:15 AM", usuario: "usuario1", accion: "Actualización de datos", detalles: "Dispositivo: Chrome" }
    ];
  
    // Función para agregar una fila al historial
    function agregarFila(acceso) {
      const row = document.createElement("tr");
  
      const tdFecha = document.createElement("td");
      tdFecha.textContent = acceso.fecha;
      row.appendChild(tdFecha);
  
      const tdUsuario = document.createElement("td");
      tdUsuario.textContent = acceso.usuario;
      row.appendChild(tdUsuario);
  
      const tdAccion = document.createElement("td");
      tdAccion.textContent = acceso.accion;
      row.appendChild(tdAccion);
  
      const tdDetalles = document.createElement("td");
      tdDetalles.textContent = acceso.detalles;
      row.appendChild(tdDetalles);
  
      historialTable.appendChild(row);
    }
  
    // Mostrar los accesos al cargar la página
    accesos.forEach(acceso => agregarFila(acceso));
  
    // Agregar un nuevo acceso (solo un ejemplo dinámico)
    agregarAccesoBtn.addEventListener("click", () => {
      const nuevoAcceso = {
        fecha: "2024-12-30 12:00 PM",
        usuario: "usuario3",
        accion: "Inicio de sesión",
        detalles: "Dispositivo: Firefox"
      };
      
      agregarFila(nuevoAcceso);
    });
  });
  