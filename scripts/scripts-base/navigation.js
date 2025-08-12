/**
 * ========================================
 * SISTEMA DE NAVEGACIÓN
 * ========================================
 * 
 * Funciones para manejar la navegación y el menú
 */

// ========================================
// FUNCIONES DE NAVEGACIÓN
// ========================================

/**
 * Función para hacer scroll a una sección específica
 */
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  
  if (targetElement) {
    // Cerrar menú móvil si está abierto
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarToggle = document.querySelector('.navbar-toggle');
    if (navbarMenu && navbarToggle) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
    }
    
    // Scroll suave
    const navbarHeight = 80;
    const targetPosition = targetElement.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Actualizar enlace activo
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      updateActiveNavLink(activeLink);
    }
  }
}

/**
 * Función para alternar el menú móvil
 */
function toggleMobileMenu() {
  const navbarMenu = document.getElementById('navbar-menu');
  const navbarToggle = document.querySelector('.navbar-toggle');
  
  if (navbarMenu && navbarToggle) {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
  }
}

/**
 * Función para inicializar navegación suave
 */
function initializeSmoothScroll() {
  // Agregar navegación suave a todos los enlaces del navbar
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Cerrar menú móvil si está abierto
        const navbarMenu = document.getElementById('navbar-menu');
        const navbarToggle = document.querySelector('.navbar-toggle');
        if (navbarMenu && navbarToggle) {
          navbarMenu.classList.remove('active');
          navbarToggle.classList.remove('active');
        }
        
        // Scroll suave
        const navbarHeight = 80; // Altura del navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Actualizar enlace activo
        updateActiveNavLink(this);
      }
    });
  });
  
  // Actualizar enlace activo al hacer scroll
  window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
}

/**
 * Función para actualizar el enlace activo en la navegación
 */
function updateActiveNavLink(activeLink) {
  // Remover clase active de todos los enlaces
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Agregar clase active al enlace actual
  activeLink.classList.add('active');
}

/**
 * Función para actualizar el enlace activo basado en el scroll
 */
function updateActiveNavOnScroll() {
  const sections = ['inicio', 'ejemplos', 'editor', 'formulario', 'documentacion'];
  const navbarHeight = 80;
  const scrollPosition = window.scrollY + navbarHeight + 50;
  
  let currentSection = '';
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      currentSection = sectionId;
    }
  });
  
  if (currentSection) {
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeLink && !activeLink.classList.contains('active')) {
      updateActiveNavLink(activeLink);
    }
  }
}
