/**
 * ========================================
 * CAROUSEL FUNCTIONALITY
 * ========================================
 * 
 * Manejo del carousel en la sección "Por qué nosotros"
 */

let currentSlide = 0;
const totalSlides = 4;
let autoSlideInterval;

// Función para cambiar a un slide específico
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
  updateIndicators();
  
  // Pausar por 5 segundos cuando se toca un indicador
  clearInterval(autoSlideInterval);
  setTimeout(() => {
    startAutoSlide();
  }, 1500000); // Espera 5 segundos antes de reanudar auto-slide
}

// Función para ir al siguiente slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  updateIndicators();
  resetAutoSlide();
}

// Función para ir al slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  updateIndicators();
  resetAutoSlide();
}

// Función para actualizar la posición del carousel
function updateCarousel() {
  const track = document.getElementById('carousel-track');
  if (track) {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
  }
}

// Función para actualizar los indicadores
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Función para reiniciar el auto-slide
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Función para iniciar el auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 12000); // Cambia cada 12 segundos (mucho más lento)
}

// Función para pausar el auto-slide cuando el mouse está sobre el carousel
function pauseAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Función para reanudar el auto-slide cuando el mouse sale del carousel
function resumeAutoSlide() {
  startAutoSlide();
}

// Inicializar el carousel cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Configurar eventos de mouse para pausar/reanudar auto-slide
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
    carouselContainer.addEventListener('mouseleave', resumeAutoSlide);
    
    // Iniciar el auto-slide
    startAutoSlide();
  }
  
  // Configurar navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
});

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
  updateCarousel();
});
