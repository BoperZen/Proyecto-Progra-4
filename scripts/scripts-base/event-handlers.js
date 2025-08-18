/**
 * ========================================
 * MANEJADORES DE EVENTOS
 * ========================================
 * 
 * Funciones que manejan los eventos de la interfaz de usuario
 */

// ========================================
// EVENTOS PRINCIPALES DE LA APLICACIÓN
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

✨ Puedes cambiar este contenido en los scripts`;
      
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
