/**
 * ========================================
 * UTILIDADES BÁSICAS
 * ========================================
 * 
 * Funciones de utilidad general para el proyecto
 */

// ========================================
// FUNCIONES DE UTILIDAD BÁSICAS
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
      element.classList.add('visible');
    } else {
      element.classList.add('hidden');
      element.classList.remove('visible');
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
    errorContainer.style.color = '#dc3545';
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
    button.textContent = 'Limpiar';
    button.style.backgroundColor = '#6c757d';
    button.classList.add('active');
  } else {
    button.textContent = 'Ejecutar';
    button.style.backgroundColor = '';
    button.classList.remove('active');
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
