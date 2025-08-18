/**
 * Configuración de ejemplo para APIs
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como 'config.js'
 * 2. Reemplaza 'YOUR_GOOGLE_MAPS_API_KEY_HERE' con tu API key real
 * 3. El archivo config.js no se subirá al repositorio (protegido por .gitignore)
 */

const CONFIG = {
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE'
};

/**
 * Función para cargar el script de Google Maps de manera segura
 */
function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    // Verificar si Google Maps ya está cargado
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Verificar si hay API key configurada
    if (CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      reject(new Error('Por favor configura tu API key de Google Maps en scripts/config.js'));
      return;
    }

    // Crear script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Manejar carga exitosa
    script.onload = () => resolve();
    
    // Manejar errores
    script.onerror = () => reject(new Error('Error al cargar Google Maps API'));
    
    // Agregar script al documento
    document.head.appendChild(script);
  });
}

// Exportar configuración para uso global
window.CONFIG = CONFIG;
window.loadGoogleMapsScript = loadGoogleMapsScript;