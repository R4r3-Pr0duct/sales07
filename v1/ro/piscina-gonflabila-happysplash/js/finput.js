$(document).ready(function() {
    $('#order_form input, #order_form select').each(function() {
        $(this).on('focus', function() {
            $(this).parent('.finput').addClass('active');
        });
        $(this).on('blur', function() {
            if ($(this).val().length === 0) {
                $(this).parent('.finput').removeClass('active');
            }
        });
        if ($(this).val() !== '') $(this).parent('.finput').addClass('active');
    });
});