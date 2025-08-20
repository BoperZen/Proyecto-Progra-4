// Smooth scroll para botones de reservar
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces que apuntan a anclas internas en esta página
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"], a[href*="#reservaciones"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Si el enlace es a otra página con #reservaciones, redirige normalmente
            if (href.startsWith('../index.html#')) {
                // Permite la redirección
                return;
            }
            // Si el enlace es interno, aplica scroll suave
            if (href.startsWith('#')) {
                e.preventDefault();
                const id = href.slice(1); // Quita el #
                const targetSection = document.getElementById(id);
                console.log('Enlace clic:', href, 'Destino:', targetSection);
                if (targetSection) {
                    const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 150;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    alert('No existe el elemento con id: ' + id);
                }
            }
        });
    });
});
