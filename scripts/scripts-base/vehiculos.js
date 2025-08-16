document.querySelectorAll('input[name="tipo"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const seleccionados = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(cb => cb.value);
        document.querySelectorAll('.vehiculo-card').forEach(card => {
            const tipo = card.getAttribute('data-tipo');
            if (seleccionados.length === 0 || seleccionados.some(sel => tipo.includes(sel))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
