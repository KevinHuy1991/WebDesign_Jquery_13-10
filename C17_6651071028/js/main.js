$(document).ready(function () {
    $('h3').on('click', function () {
        var $content = $(this).next('.box');

        if ($content.is(':visible')) {
            $content.slideUp(300);
        } else {
            // Ẩn tất cả các box khác để chỉ mở 1 nội dung tại một thời điểm
            $('.box').slideUp(300);
            // Hiện nội dung (div) tiếp theo của tiêu đề vừa click
            $content.slideDown(300);
        }
    });
});
