$(document).ready(function () {
    $('.checkme').on('change', function () {
        var $card = $(this).closest('.checkbox-card');
        if ($(this).is(':checked')) {
            $card.find('.passport-box').slideDown();
        } else {
            $card.find('.passport-box').slideUp();
        }
    });
});
