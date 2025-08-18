// Configuración para manejo de API keys
// Este archivo lee las variables de entorno

// Función para obtener la API key de Google Maps
function getGoogleMapsApiKey() {
  // En producción, podrías obtenerla de variables de entorno del servidor
  // Por ahora, para desarrollo local, la obtenemos de un archivo de configuración
  
  // Verificar si existe la variable en el localStorage (para desarrollo local)
  const localApiKey = localStorage.getItem('GOOGLE_MAPS_API_KEY');
  if (localApiKey) {
    return localApiKey;
  }
  
  // Si no hay clave configurada, mostrar instrucciones
  console.warn('⚠️ API Key de Google Maps no configurada. Ver README.md para instrucciones.');
  return null;
}

// Función para configurar la API key localmente
function setGoogleMapsApiKey(apiKey) {
  localStorage.setItem('GOOGLE_MAPS_API_KEY', apiKey);
  console.log('✅ API Key de Google Maps configurada localmente');
}

// Función para cargar el script de Google Maps dinámicamente
function loadGoogleMapsScript() {
  const apiKey = getGoogleMapsApiKey();
  
  if (!apiKey) {
    console.error('❌ No se puede cargar Google Maps sin API key');
    return;
  }
  
  // Crear y cargar el script dinámicamente
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  document.head.appendChild(script);
}
