/**
 * ========================================
 * PLANTILLA DE SCRIPT PRINCIPAL
 * ========================================
 * 
 * Este archivo contiene la estructura básica de JavaScript
 * para un proyecto web interactivo.
 * 
 * SECCIONES:
 * 1. Variables y configuración global
 * 2. Funciones de utilidad
 * 3. Manejadores de eventos
 * 4. Funciones principales de la aplicación
 * 5. Inicialización
 */

// ========================================
// 1. VARIABLES Y CONFIGURACIÓN GLOBAL
// ========================================

/**
 * Configuración general de la aplicación
 */
const CONFIG = {
  // Configuraciones generales aquí
  version: '1.0.0',
  debug: true,
  
  // Selectores de elementos DOM
  selectors: {
    codeEditor: '#code-editor',
    codeOutput: '#code-output',
    codeErrors: '#code-errors'
  }
};

/**
 * Estado global de la aplicación
 */
let appState = {
  // Variables de estado aquí
  isCodeRunning: false,
  lastResult: null
};

// ========================================
// 2. FUNCIONES DE UTILIDAD
// ========================================

/**
 * Función de utilidad para mostrar/ocultar elementos
 * @param {string} elementId - ID del elemento
 * @param {boolean} show - Si mostrar (true) u ocultar (false)
 */
function toggleElement(elementId, show) {
  const element = document.getElementById(elementId);
  if (element) {
    if (show) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
}

/**
 * Función para mostrar mensajes de error
 * @param {string} message - Mensaje de error
 * @param {string} containerId - ID del contenedor donde mostrar el error
 */
function showError(message, containerId = 'code-errors') {
  const errorContainer = document.getElementById(containerId);
  if (errorContainer) {
    errorContainer.textContent = `❌ Error: ${message}`;
    errorContainer.classList.remove('hidden');
  }
}

/**
 * Función para limpiar mensajes de error
 * @param {string} containerId - ID del contenedor de errores
 */
function clearErrors(containerId = 'code-errors') {
  const errorContainer = document.getElementById(containerId);
  if (errorContainer) {
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
  }
}

/**
 * Función para actualizar botones de estado
 * @param {HTMLElement} button - Elemento del botón
 * @param {boolean} isActive - Si el botón está activo
 */
function updateButtonState(button, isActive) {
  if (isActive) {
    button.textContent = 'Esconder';
    button.style.backgroundColor = '#6c757d';
    button.classList.add('active');
  } else {
    button.textContent = 'Ejecutar';
    button.style.backgroundColor = '#656d76';
    button.classList.remove('active');
  }
}

// ========================================
// 3. MANEJADORES DE EVENTOS
// ========================================

/**
 * Función principal para ejecutar ejemplos
 * Esta es una plantilla que puedes modificar según tus necesidades
 */
function executeExample() {
  const resultElement = document.getElementById('result-ejemplo');
  const button = event.target;
  
  if (button.textContent === 'Ejecutar') {
    try {
      // AQUÍ PUEDES AGREGAR TU LÓGICA DE EJECUCIÓN
      const resultado = `🚀 Resultado de ejemplo

¡Hola mundo!
Esta es una plantilla lista para personalizar
Modifica este contenido según tus necesidades

✨ Puedes cambiar este contenido en el script.js`;
      
      resultElement.textContent = resultado;
      toggleElement('result-ejemplo', true);
      updateButtonState(button, true);
      
    } catch (error) {
      showError(error.message, 'result-ejemplo');
      toggleElement('result-ejemplo', true);
      updateButtonState(button, true);
    }
  } else {
    toggleElement('result-ejemplo', false);
    updateButtonState(button, false);
  }
}

/**
 * Función para mostrar/ocultar el editor interactivo
 */
function showInteractiveEditor() {
  const container = document.getElementById('interactive-editor-container');
  const button = event.target;
  
  if (button.textContent === 'Abrir Editor') {
    toggleElement('interactive-editor-container', true);
    button.textContent = 'Cerrar Editor';
    button.style.backgroundColor = '#6c757d';
  } else {
    toggleElement('interactive-editor-container', false);
    button.textContent = 'Abrir Editor';
    button.style.backgroundColor = '';
  }
}

/**
 * Función para mostrar/ocultar el generador de formulario
 */
function showFormGenerator() {
  const container = document.getElementById('form-generator-container');
  const button = event.target;
  
  if (button.textContent === 'Abrir Formulario') {
    toggleElement('form-generator-container', true);
    button.textContent = 'Cerrar Formulario';
    button.style.backgroundColor = '#6c757d';
    
    // Inicializar el formulario si es la primera vez
    initializeForm();
  } else {
    toggleElement('form-generator-container', false);
    button.textContent = 'Abrir Formulario';
    button.style.backgroundColor = '';
  }
}

/**
 * Función para ejecutar código desde el editor
 */
function runCode() {
  const editor = document.getElementById('code-editor');
  const output = document.getElementById('code-output');
  
  try {
    const code = editor.value.trim();
    
    if (!code) {
      output.textContent = 'Editor vacío - Escribe código para ejecutar';
      clearErrors();
      return;
    }
    
    // AQUÍ PUEDES AGREGAR TU LÓGICA PARA EJECUTAR EL CÓDIGO
    // Por ejemplo, evaluar JavaScript de forma segura
    const result = `Código ejecutado: ${code}`;
    
    output.textContent = result;
    clearErrors();
    
  } catch (error) {
    output.textContent = 'Error al ejecutar el código';
    showError(error.message);
  }
}

/**
 * Función para limpiar el editor
 */
function clearEditor() {
  document.getElementById('code-editor').value = '';
  document.getElementById('code-output').textContent = 'El resultado aparecerá aquí';
  clearErrors();
}

/**
 * Función para generar salida desde el formulario
 */
function generateOutput() {
  const input1 = document.getElementById('input-1').value;
  const input2 = document.getElementById('input-2').value;
  const input3 = document.getElementById('input-3').checked;
  
  // AQUÍ PUEDES AGREGAR TU LÓGICA PARA PROCESAR LOS DATOS
  const generatedData = {
    campo1: input1 || 'Sin valor',
    campo2: input2 || 'Sin valor',
    campo3: input3,
    timestamp: new Date().toISOString(),
    id: Math.floor(Math.random() * 1000)
  };
  
  const output = document.getElementById('generated-output');
  output.textContent = JSON.stringify(generatedData, null, 2);
}

// ========================================
// 4. FUNCIONES PRINCIPALES DE LA APLICACIÓN
// ========================================

/**
 * Función principal de inicialización
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initializeApp() {
  console.log('Inicializando aplicación...');
  
  // Configurar eventos del editor en tiempo real (opcional)
  const editor = document.getElementById('code-editor');
  if (editor) {
    editor.addEventListener('input', function() {
      // Auto-ejecución o validación en tiempo real aquí (opcional)
      // clearTimeout(this.autoRunTimeout);
      // this.autoRunTimeout = setTimeout(runCode, 1000);
    });
  }
  
  // Inicializar formulario con valores por defecto (opcional)
  initializeForm();
  
  // Inicializar navegación suave
  initializeSmoothScroll();
  
  // Inicializar tema
  ThemeManager.init();
  
  console.log('Aplicación inicializada correctamente');
}

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

/**
 * Función para throttling de eventos
 */
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Función para inicializar el formulario con valores por defecto
 */
function initializeForm() {
  const output = document.getElementById('generated-output');
  if (output) {
    output.textContent = 'Los datos generados aparecerán aquí';
  }
  
  // Agregar más inicializaciones de formulario aquí
}

/**
 * Función de ejemplo para manejo de APIs (plantilla)
 * @param {string} url - URL de la API
 * @param {object} options - Opciones de la petición
 */
async function fetchData(url, options = {}) {
  try {
    appState.isCodeRunning = true;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    appState.lastResult = data;
    
    return data;
    
  } catch (error) {
    console.error('Error en petición:', error);
    throw error;
  } finally {
    appState.isCodeRunning = false;
  }
}

/**
 * Función de ejemplo para validar datos
 * @param {any} data - Datos a validar
 * @returns {object} Resultado de la validación
 */
function validateData(data) {
  const errors = [];
  const warnings = [];
  
  // AQUÍ PUEDES AGREGAR TU LÓGICA DE VALIDACIÓN
  if (!data) {
    errors.push('Los datos son requeridos');
  }
  
  if (typeof data === 'string' && data.trim() === '') {
    warnings.push('El texto está vacío');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// ========================================
// 5. INICIALIZACIÓN
// ========================================

/**
 * Evento que se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Manejo de errores globales (opcional)
 */
window.addEventListener('error', function(event) {
  if (CONFIG.debug) {
    console.error('Error global capturado:', event.error);
  }
});

// ========================================
// FUNCIONES ADICIONALES (PLANTILLAS)
// ========================================

/**
 * Plantilla para manejo de almacenamiento local
 */
const Storage = {
  /**
   * Guardar datos en localStorage
   * @param {string} key - Clave
   * @param {any} value - Valor a guardar
   */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  },
  
  /**
   * Cargar datos desde localStorage
   * @param {string} key - Clave
   * @returns {any} Valor guardado o null
   */
  load(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error cargando desde localStorage:', error);
      return null;
    }
  },
  
  /**
   * Eliminar datos de localStorage
   * @param {string} key - Clave
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
    }
  }
};

/**
 * Plantilla para manejo de temas (modo claro/oscuro)
 */
const ThemeManager = {
  /**
   * Alternar entre tema claro y oscuro
   */
  toggle() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (isDark) {
      body.classList.remove('dark-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      Storage.save('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
      Storage.save('theme', 'dark');
    }
  },
  
  /**
   * Inicializar tema desde localStorage
   */
  init() {
    const savedTheme = Storage.load('theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }
};

// Inicializar tema al cargar la página
// ThemeManager.init();

// ========================================
// 4. FUNCIONES AUXILIARES PARA ELEMENTOS INTERACTIVOS
// ========================================

/**
 * Función para inicializar el formulario dinámico
 */
function initializeForm() {
  const container = document.getElementById('form-generator-container');
  
  // Solo inicializar si el contenedor está vacío
  if (!container.querySelector('form')) {
    container.innerHTML = `
      <div class="form-preview">
        <h3>Generador de Formulario</h3>
        <p>Esta es una plantilla para crear formularios dinámicos.</p>
        
        <form class="sample-form">
          <div class="form-group">
            <label for="sample-input">Campo de ejemplo:</label>
            <input type="text" id="sample-input" placeholder="Escribe aquí">
          </div>
          
          <div class="form-group">
            <label for="sample-select">Selector:</label>
            <select id="sample-select">
              <option value="">Seleccionar opción</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>
              <input type="checkbox" id="sample-checkbox">
              Campo checkbox
            </label>
          </div>
          
          <button type="button" onclick="handleFormSubmit()" class="form-submit-btn">
            Procesar Formulario
          </button>
        </form>
        
        <div id="form-result" class="form-result hidden"></div>
      </div>
    `;
  }
}

/**
 * Función para manejar el envío del formulario
 */
function handleFormSubmit() {
  const input = document.getElementById('sample-input').value;
  const select = document.getElementById('sample-select').value;
  const checkbox = document.getElementById('sample-checkbox').checked;
  const resultDiv = document.getElementById('form-result');
  
  const result = `
    📋 Datos del formulario:
    • Campo de texto: ${input || 'vacío'}
    • Selección: ${select || 'ninguna'}
    • Checkbox: ${checkbox ? 'marcado' : 'no marcado'}
    
    ✨ Personaliza esta función en script.js
  `;
  
  resultDiv.textContent = result;
  resultDiv.classList.remove('hidden');
}

/**
 * Función para alternar la visibilidad de los consejos
 */
function toggleConsejo(element) {
  const isActive = element.classList.contains('active');
  
  // Cerrar todos los otros consejos abiertos
  const allConsejos = document.querySelectorAll('.consejo-item');
  allConsejos.forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  
  // Alternar el consejo actual
  if (isActive) {
    element.classList.remove('active');
  } else {
    element.classList.add('active');
  }
}