/**
 * ========================================
 * ELEMENTOS INTERACTIVOS
 * ========================================
 * 
 * Funciones para manejar elementos interactivos como formularios y editores
 */

// ========================================
// FUNCIONES PARA ELEMENTOS INTERACTIVOS
// ========================================

/**
 * Función para inicializar el formulario dinámico
 */
function initializeForm() {
  const container = document.getElementById('form-generator-container');
  
  // Solo inicializar si el contenedor existe y está vacío
  if (container && !container.querySelector('form')) {
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
  
  // Inicializar también el output del formulario original si existe
  const output = document.getElementById('generated-output');
  if (output) {
    output.textContent = 'Los datos generados aparecerán aquí';
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
    
    ✨ Personaliza esta función en interactive-elements.js
  `;
  
  resultDiv.textContent = result;
  resultDiv.classList.remove('hidden');
}
