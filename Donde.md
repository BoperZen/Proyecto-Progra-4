# Integración de tecnologías en el proyecto

## 1. Vue.js

**Dónde se aplica:**  
Vue.js se utiliza en las páginas donde se requiere interacción dinámica con el usuario, como en los formularios de reservación y en la gestión de vehículos.  
- Ejemplo: En `reservacion.html`, el formulario de búsqueda de reservas puede estar gestionado por un componente Vue para validar datos, mostrar resultados en tiempo real y manejar estados del formulario.

**Archivos involucrados:**  
- `reservacion.html`
- `vehiculos.html`
- Componentes Vue en la carpeta `/scripts/` o `/components/`

---

## 2. API de Google

**Dónde se aplica:**  
La API de Google se utiliza para funcionalidades como mapas, autocompletado de direcciones, o integración con Google Calendar para reservas.
- Ejemplo: En la sección de contacto o en el formulario de reservación, se puede mostrar un mapa de la ubicación de la empresa usando Google Maps API.

**Archivos involucrados:**  
- `reservacion.html` (mapa en el formulario o resultados)
- `index.html` (mapa de ubicación en la página principal)
- Scripts en `/scripts/` que gestionan la integración con Google

---

## 3. API del Carousel

**Dónde se aplica:**  
El API del carousel se utiliza para mostrar galerías de imágenes, testimonios, o vehículos destacados en formato deslizable.
- Ejemplo: En `vehiculos.html` y posiblemente en la página principal, se utiliza un carousel para mostrar imágenes de autos disponibles o destinos turísticos.

**Archivos involucrados:**  
- `vehiculos.html`
- `index.html`
- CSS y JS del carousel en `/styles/` y `/scripts/`

---

**Resumen:**  
- **Vue.js:** Formularios y componentes interactivos.
- **API de Google:** Mapas, autocompletado y servicios externos.
- **API del Carousel:** Galerías y sliders de contenido visual.