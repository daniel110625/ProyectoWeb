// FORMULARIO CONTACTO
const form = document.getElementById("formContacto");
const estado = document.getElementById("mensajeEstado");
const fechaNacimientoInput = document.getElementById("fechaNacimiento");
const edadCalculada = document.getElementById("edadCalculada");

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

fechaNacimientoInput.addEventListener("change", function () {
  if (this.value) {
    const edad = calcularEdad(this.value);
    edadCalculada.textContent = "Edad calculada: " + edad + " años";
  } else {
    edadCalculada.textContent = "";
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const servicio = document.getElementById("servicio").value;
  const mensaje = document.getElementById("mensaje").value.trim();
  const acepta = document.getElementById("acepta").checked;

  if (!nombre || !correo || !fechaNacimiento || !servicio || !mensaje) {
    estado.textContent = "Por favor completa todos los campos obligatorios.";
    estado.style.color = "red";
    return;
  }

  const edad = calcularEdad(fechaNacimiento);

  if (servicio === "Adopción" && edad < 18) {
    estado.textContent = "Para realizar una adopción debes ser mayor de 18 años.";
    estado.style.color = "red";
    return;
  }

  if (!acepta) {
    estado.textContent = "Debes aceptar compartir tus datos.";
    estado.style.color = "red";
    return;
  }

  estado.textContent = "Enviando mensaje...";
  estado.style.color = "#333";

  try {
    const formData = new FormData(form);

    const respuesta = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (respuesta.ok) {
      estado.textContent = "¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.";
      estado.style.color = "green";
      form.reset();
      edadCalculada.textContent = "";
    } else {
      estado.textContent = "Hubo un error al enviar el mensaje. Inténtalo nuevamente.";
      estado.style.color = "red";
    }
  } catch (error) {
    estado.textContent = "No se pudo enviar el formulario. Revisa tu conexión.";
    estado.style.color = "red";
  }
});