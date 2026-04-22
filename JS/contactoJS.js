// FORMULARIO CONTACTO

const form = document.getElementById('formContacto');
const estado = document.getElementById('mensajeEstado');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const edad = parseInt(document.getElementById('edad').value);
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const acepta = document.getElementById('acepta').checked;

  // VALIDACIONES
  if (!nombre || !correo || !edad || !fechaNacimiento || !servicio || !mensaje) {
    estado.textContent = "Por favor completa todos los campos.";
    estado.style.color = "red";
    return;
  }

  if (isNaN(edad) || edad < 18) {
    estado.textContent = "Lo sentimos, solo mayores de 18 años pueden realizar una adopción.";
    estado.style.color = "red";
    return;
  }

  if (!acepta) {
    estado.textContent = "Debes aceptar compartir tus datos.";
    estado.style.color = "red";
    return;
  }

  // MENSAJE FINAL
  estado.textContent = "¡Mensaje enviado! Nos pondremos en contacto pronto.";
  estado.style.color = "green";

  form.reset();
});