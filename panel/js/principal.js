const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;

document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse de que la sección activa se seleccione correctamente al cargar la página
  const activeLink = document.querySelector(".sidebar-links a.active");
  if (activeLink) {
    activeIndex = Array.from(sidebar_links).indexOf(activeLink);
    moveActiveTab();
  }
});

shrink_btn.addEventListener("click", () => {
  document.body.classList.toggle("shrink");
  setTimeout(moveActiveTab, 400);

  shrink_btn.classList.add("hovered");

  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();
});

function moveActiveTab() {
  let topPosition = activeIndex * 59 + 2.6;

  if (document.body.classList.contains('shrink')) {
    topPosition -= shortcuts.clientHeight / 2; // ajuste del colapso del menu
  } else {
    if (activeIndex > 6) {
      topPosition += shortcuts.clientHeight;
    }
  }

  active_tab.style.top = `${topPosition}px`;
}

function changeLink() {
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  this.classList.add("active");

  activeIndex = Array.from(sidebar_links).indexOf(this);

  moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove("show"));
  spans[tooltipIndex].classList.add("show");

  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});

// main

//modo oscuro//

document.addEventListener('DOMContentLoaded', function () {
  const palanca = document.querySelector(".switch");
  const icono = document.getElementById("icon");
  const iframe = document.getElementById("contenido");

  // Función para aplicar el modo oscuro
  function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      icono.classList.replace("bi-moon", "bi-sun"); // Cambia a icono de sol para modo oscuro
      if (iframe.contentWindow && iframe.contentWindow.document) {
        iframe.contentWindow.document.body.classList.add("dark-mode");
      }
    } else {
      document.body.classList.remove("dark-mode");
      icono.classList.replace("bi-sun", "bi-moon"); // Cambia a icono de luna para modo claro
      if (iframe.contentWindow && iframe.contentWindow.document) {
        iframe.contentWindow.document.body.classList.remove("dark-mode");
      }
    }
  }

  // Leer preferencia del modo oscuro desde localStorage al cargar la página
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(isDarkMode);

  palanca.addEventListener("click", () => {
    const newIsDarkMode = !document.body.classList.contains("dark-mode");
    applyDarkMode(newIsDarkMode);
    localStorage.setItem('darkMode', newIsDarkMode);
    palanca.classList.toggle("prendido");
  });

  // Aplicar el modo oscuro en el iframe cuando se carga
  iframe.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (iframe.contentWindow && iframe.contentWindow.document) {
      if (isDarkMode) {
        iframe.contentWindow.document.body.classList.add("dark-mode");
      } else {
        iframe.contentWindow.document.body.classList.remove("dark-mode");
      }
    }
  });
});
