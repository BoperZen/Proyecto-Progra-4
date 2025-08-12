/**
 * ========================================
 * SCRIPT PRINCIPAL DE LA APLICACIÓN
 * ========================================
 * 
 * Este es el archivo principal que coordina todos los módulos
 * de la aplicación web.
 * 
 * Los módulos están organizados en scripts-base/ para mantener
 * el código ordenado y separado por funcionalidades.
 */

// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================

/**
 * Configuración general de la aplicación
 */
const CONFIG = {
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
  isCodeRunning: false,
  lastResult: null
};

// ========================================
// INICIALIZACIÓN PRINCIPAL
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
  if (typeof initializeForm === 'function') {
    initializeForm();
  }
  
  // Inicializar navegación suave
  if (typeof initializeSmoothScroll === 'function') {
    initializeSmoothScroll();
  }
  
  // Inicializar tema
  if (typeof ThemeManager !== 'undefined' && ThemeManager.init) {
    ThemeManager.init();
  }
  
  console.log('Aplicación inicializada correctamente');
}

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