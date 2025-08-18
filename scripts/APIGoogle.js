let map;                     // Mapa de Google Maps
let directionsService;       // Servicio de direcciones para calcular rutas
let directionsRenderer;      // Objeto que dibuja la ruta en el mapa

// Coordenadas de la oficina principal de Why Not Rent a Car (ubicación fija)
const oficinaCoords = {
  lat: 10.01685,             // Latitud de la oficina (San Rafael de Alajuela - cambiar luego)
  lng: -84.208939            // Longitud de la oficina
};

// Función principal que inicializa el mapa
async function initMap() {
  // Importar la clase Map de la librería de Google Maps
  const { Map } = await google.maps.importLibrary("maps");

  // Importar el marcador avanzado de la librería Marker
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Crear el mapa centrado en las coordenadas de la oficina
  map = new Map(document.getElementById("map"), {
    center: oficinaCoords,         // Centro del mapa
    zoom: 15,                      // Nivel de zoom
    mapId: "DEMO_MAP_ID",          // ID del mapa (puede ser personalizado desde Google Cloud)
  });

  // Colocar marcador en la ubicación de la oficina
  new AdvancedMarkerElement({
    map: map,
    position: oficinaCoords,
    title: "Why Not Rent a Car - Oficina Principal",    // Texto que aparece al pasar el mouse
  });

  // Inicializar los servicios de direcciones
  directionsService = new google.maps.DirectionsService();   // Calcula la ruta
  directionsRenderer = new google.maps.DirectionsRenderer(); // Dibuja la ruta en el mapa
  directionsRenderer.setMap(map);                            // Asocia el renderizador al mapa

  // Verificar si el navegador soporta geolocalización
  if (navigator.geolocation) {
    // Solicita la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Coordenadas actuales del usuario
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Coloca marcador en la ubicación del usuario
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Tu ubicación",   // Texto que se muestra al pasar el mouse
        });

        // Centra el mapa en la ubicación del usuario
        map.setCenter(userLocation);

        // Llama función para calcular la distancia entre usuario y oficina
        calcularDistancia(userLocation);

        // Traza la ruta desde el usuario hasta la oficina
        trazarRuta(userLocation, oficinaCoords);
      },
      () => {
        // Si no se pudo obtener la ubicación del usuario, muestra un mensaje
        alert("No se pudo obtener tu ubicación.");
      }
    );
  } else {
    // Si el navegador no soporta geolocalización, muestra un mensaje
    alert("Tu navegador no soporta geolocalización.");
  }
}

// Función que calcula la distancia entre el usuario y la oficina
function calcularDistancia(origen) {
  // Crear el servicio de matriz de distancia (DistanceMatrixService)
  const servicio = new google.maps.DistanceMatrixService();

  // Configurar la solicitud
  servicio.getDistanceMatrix(
    {
      origins: [origen],                  // Punto de partida (usuario)
      destinations: [oficinaCoords],      // Punto de llegada (oficina)
      travelMode: google.maps.TravelMode.DRIVING, // Modo de viaje: conducir
    },
    (response, status) => {
      // Si la solicitud fue exitosa
      if (status === "OK") {
        // Extraer la distancia y duración desde la respuesta
        const distancia = response.rows[0].elements[0].distance.text;
        const duracion = response.rows[0].elements[0].duration.text;

        // Mostrar los datos en el elemento HTML con id="distancia"
        document.getElementById("distancia").innerText =
          `📍 Distancia a nuestra oficina: ${distancia} - Tiempo estimado: ${duracion}`;
      } else {
        // Si hubo un error, mostrar mensaje
        document.getElementById("distancia").innerText =
          "📍 No se pudo calcular la distancia a nuestra oficina.";
      }
    }
  );
}

// Función que traza la ruta en el mapa entre dos puntos
function trazarRuta(origen, destino) {
  // Configuración de la solicitud de ruta
  const request = {
    origin: origen,                     // Punto de partida (usuario)
    destination: destino,              // Punto de llegada (oficina)
    travelMode: google.maps.TravelMode.DRIVING, // Modo de viaje
  };

  // Llamar al servicio de direcciones para calcular la ruta
  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      // Mostrar la ruta en el mapa
      directionsRenderer.setDirections(result);
    } else {
      // Si hubo un error al calcular la ruta, mostrar mensaje
      alert("No se pudo trazar la ruta hasta nuestra oficina.");
    }
  });
}

// Esta función se llama automáticamente desde el script del mapa
// <script async src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap"></script>
window.initMap = initMap;