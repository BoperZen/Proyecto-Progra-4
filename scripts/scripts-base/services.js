/**
 * ========================================
 * SERVICIOS Y APIS
 * ========================================
 * 
 * Funciones para manejo de datos, almacenamiento y comunicación con APIs
 */

// ========================================
// SERVICIOS DE DATOS
// ========================================

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
