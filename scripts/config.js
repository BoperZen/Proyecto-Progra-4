// Configuración simple para Google Maps API
// INSTRUCCIONES:
// 1. Reemplaza 'YOUR_GOOGLE_MAPS_API_KEY_HERE' con tu API key real
// 2. Antes de subir al repositorio, asegúrate de no incluir tu key real

const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE' // <- Reemplaza esto con tu API key
};

// Función para cargar Google Maps con la API key configurada
function loadGoogleMapsScript() {
    const apiKey = CONFIG.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        console.error('❌ Google Maps API Key no configurada.');
        console.log('📝 Para configurar:');
        console.log('1. Abre scripts/config.js');
        console.log('2. Reemplaza YOUR_GOOGLE_MAPS_API_KEY_HERE con tu API key');
        console.log('3. Guarda el archivo');
        
        alert('🔑 API Key de Google Maps no configurada.\n\nPara configurar:\n1. Abre scripts/config.js\n2. Reemplaza YOUR_GOOGLE_MAPS_API_KEY_HERE con tu API key\n3. Guarda el archivo');
        return;
    }

    // Crear el script de Google Maps dinámicamente
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Agregar el script al documento
    document.head.appendChild(script);
}
