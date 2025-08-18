// Smooth scroll para botones de reservar
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces que apuntan a anclas internas
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular posición con offset para mostrar el título completo
                const offsetTop = targetSection.offsetTop - 80; // 80px de margen superior
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
