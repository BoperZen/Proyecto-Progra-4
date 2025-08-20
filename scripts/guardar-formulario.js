// Este script guarda la información de formularios en un array, la convierte a JSON y la muestra en pantalla.
// Recupera los formularios guardados en localStorage o inicializa el array vacío
let formularios = JSON.parse(localStorage.getItem('formularios')) || [];

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservaciones-form');

  // Crear el bloque de resultado y el warning, ocultos al inicio
  const resultadoBlock = document.createElement('div');
  resultadoBlock.id = 'reserva-resultado-block';
  resultadoBlock.style.display = 'none';
  resultadoBlock.style.marginTop = '2em';
  resultadoBlock.style.padding = '2em';
  resultadoBlock.style.background = '#f5f7fa';
  resultadoBlock.style.borderRadius = '12px';
  resultadoBlock.style.boxShadow = '0 2px 12px rgba(35,44,103,0.08)';
  resultadoBlock.style.textAlign = 'center';
  resultadoBlock.style.position = 'relative';

  const warningBlock = document.createElement('div');
  warningBlock.id = 'reserva-warning-block';
  warningBlock.style.display = 'none';
  warningBlock.style.marginTop = '1em';
  warningBlock.style.padding = '1em';
  warningBlock.style.background = '#fff3cd';
  warningBlock.style.borderRadius = '8px';
  warningBlock.style.color = '#856404';
  warningBlock.style.fontWeight = '500';
  warningBlock.style.boxShadow = '0 1px 6px rgba(35,44,103,0.06)';
  warningBlock.style.textAlign = 'center';

  // Insertar los bloques después del formulario
  if (form) {
    form.parentNode.insertBefore(resultadoBlock, form.nextSibling);
    form.parentNode.insertBefore(warningBlock, resultadoBlock.nextSibling);

    // Inicializa EmailJS solo una vez
    if (typeof emailjs !== 'undefined' && !emailjs.__inited) {
      emailjs.init('plT7He2yU5I7_jVFL'); // Tu Public Key
      emailjs.__inited = true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const objFormulario = {};

      // Guardar todos los campos
      formData.forEach((value, key) => {
        objFormulario[key] = value;
      });

      // Calcular años cumplidos a partir de fecha de nacimiento
      if (objFormulario['fecha-nacimiento']) {
        const nacimiento = new Date(objFormulario['fecha-nacimiento']);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
          edad--;
        }
        objFormulario.edad = edad;
        delete objFormulario['fecha-nacimiento'];
      }

      // Generar código de reserva aleatorio de 4 dígitos y usarlo como id
      const codigoReserva = Math.floor(1000 + Math.random() * 9000);
      objFormulario.codigo_reserva = codigoReserva;
      objFormulario.id = codigoReserva;

      // Guardar en localStorage
      let formularios = JSON.parse(localStorage.getItem('formularios')) || [];
      formularios.push(objFormulario);
      localStorage.setItem('formularios', JSON.stringify(formularios));

      // Mostrar bloque de resultado bonito debajo del botón
      resultadoBlock.innerHTML = `
        <button id="cerrar-resultado-block" style="
          position:absolute;top:1em;right:1em;background:none;border:none;font-size:1.5em;color:#232c67;cursor:pointer;">&times;</button>
        <div style="font-size:1.3em; color:#232c67; font-weight:600; margin-bottom:0.5em;">
          ¡Su reserva ha sido procesada exitosamente!
        </div>
        <div style="font-size:1.1em; margin-bottom:1em;">
          Código de reserva: <span style="font-size:1.3em; color:#4caf50; font-weight:700;">${codigoReserva}</span>
        </div>
        <div style="color:#555; font-size:1em;">
          Pronto recibirá un correo con la confirmación y detalles de su reserva.
        </div>
      `;
      resultadoBlock.style.display = 'block';

      // Mostrar warning debajo
      warningBlock.innerHTML = `
        <span>⚠️ <strong>Asegúrese de guardar su código de reserva.</strong> Lo necesitará para cualquier consulta o modificación.</span>
      `;
      warningBlock.style.display = 'block';

      // Limpiar el formulario
      form.reset();

      // Cerrar el bloque de resultado y el warning al hacer clic en la X
      document.getElementById('cerrar-resultado-block').onclick = function () {
        resultadoBlock.style.display = 'none';
        warningBlock.style.display = 'none';
      };

      // Enviar correo con el código de reserva
      if (typeof emailjs !== 'undefined') {
        emailjs.send('service_6guednp', 'template_56eur11', {
          email: objFormulario.correo,
          nombre: objFormulario.nombre,
          codigo_reserva: codigoReserva
        })
        .then(function(response) {
          console.log('Correo enviado correctamente', response);
        }, function(error) {
          console.error('Error al enviar el correo', error);
        });
      }
    });
  }
});

window.addEventListener('pagehide', function (event) {
  if (event.persisted === false) {
    localStorage.removeItem('formularios');
  }
});
