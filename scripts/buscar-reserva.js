document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.reserva-form-block');
  const resultado = document.getElementById('reservacion-resultado-block');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const codigo = document.getElementById('codigo').value.trim();
      const correo = document.getElementById('email').value.trim().toLowerCase();

      // Obtener reservas guardadas
      const reservas = JSON.parse(localStorage.getItem('formularios')) || [];
      // Buscar la reserva por código y correo
      const reserva = reservas.find(r =>
        String(r.codigo_reserva) === codigo && r.correo.toLowerCase() === correo
      );

      if (reserva) {
        resultado.style.display = 'block';
        resultado.innerHTML = `
          <div style="background:#e8f5e9;padding:1em;border-radius:8px;color:#388e3c;font-weight:600;margin-bottom:1em;">
            ¡Reserva encontrada!
          </div>
          <div style="background:#f5f7fa;padding:2em;border-radius:12px;box-shadow:0 2px 12px rgba(35,44,103,0.08);">
            <h3 style="color:#232c67;">Información general de la reserva</h3>
            <p><strong>Código de reserva:</strong> ${reserva.codigo_reserva}</p>
            <p><strong>Tipo de vehículo:</strong> ${reserva['tipo-vehiculo']}</p>
            <p><strong>Ubicación de recogida:</strong> ${reserva['ubicacion-recogida']}</p>
            <p><strong>Reside en Costa Rica:</strong> ${reserva['reside-costa-rica']}</p>
            <p><strong>Fecha de inicio:</strong> ${reserva['fecha-inicio']}</p>
            <p><strong>Fecha de fin:</strong> ${reserva['fecha-fin']}</p>
            <p><strong>Hora a recoger:</strong> ${reserva['hora-recogida']}</p>
            <p><strong>Hora a entregar:</strong> ${reserva['hora-entrega']}</p>
          </div>
        `;
      } else {
        resultado.style.display = 'block';
        resultado.innerHTML = `
          <div style="background:#fff3cd;padding:1em;border-radius:8px;color:#856404;font-weight:600;">
            No se encontró ninguna reserva con ese código y correo.
          </div>
        `;
      }
    });
  }
});