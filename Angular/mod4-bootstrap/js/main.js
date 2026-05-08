$(function () {
    const $modalBtn = $('[data-target="#registerModal"]');

    // Evento: Cuando el modal comienza a abrirse
    $('#registerModal').on('show.bs.modal', function () {
        console.log('Evento: show.bs.modal - El modal está iniciando su apertura.');
        $modalBtn.addClass('btn-inactive').prop('disabled', true);
    });

    // Evento: Cuando el modal terminó de abrirse (transición completa)
    $('#registerModal').on('shown.bs.modal', function () {
        console.log('Evento: shown.bs.modal - El modal se ha desplegado totalmente.');
    });

    // Evento: Cuando el modal comienza a ocultarse
    $('#registerModal').on('hide.bs.modal', function () {
        console.log('Evento: hide.bs.modal - El modal está iniciando su cierre.');
    });

    // Evento: Cuando el modal terminó de ocultarse
    $('#registerModal').on('hidden.bs.modal', function () {
        console.log('Evento: hidden.bs.modal - El modal se ha cerrado.');
        $modalBtn.removeClass('btn-inactive').prop('disabled', false);
    });
});