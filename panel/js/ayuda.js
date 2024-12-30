document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");
  
    faqQuestions.forEach((faq) => {
      faq.addEventListener("click", () => {
        const answer = faq.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
      });
    });
  
    // Formulario de contacto
    const contactForm = document.getElementById("contact-form");
  
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = event.target.name.value;
      const email = event.target.email.value;
      const message = event.target.message.value;
  
      // Enviar la información del formulario (aquí solo simulamos)
      alert(`Mensaje enviado!\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`);
  
      // Limpiar el formulario
      contactForm.reset();
    });
  });
  