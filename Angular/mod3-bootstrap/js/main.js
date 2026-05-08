$(function () {
    // 1. Inicializar Tooltips y Popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // 2. Modificar velocidad del Carousel (Intervalo en milisegundos)
    $('.carousel').carousel({
        interval: 2500, // Velocidad a 2.5 segundos
        pause: "hover"  // Se detiene al pasar el mouse
    });

    // 3. Alerta dinámica al enviar formularios
    $('form').on('submit', function(e) {
        e.preventDefault();
        alert('Datos procesados correctamente. Nos pondremos en contacto pronto.');
        $('.modal').modal('hide');
    });
});