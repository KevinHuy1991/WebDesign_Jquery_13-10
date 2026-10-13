$(document).ready(function () {
    function updateTheme() {
        if ($('#myonoffswitch').is(':checked')) {
            // ON: Chuyển theme sang nền sáng (on.png)
            $('.image-effect img[src*="off.png"]').removeClass('fadeEffect');
            $('.image-effect img[src*="on.png"]').addClass('fadeEffect');
        } else {
            // OFF: Chuyển theme sang nền tối (off.png)
            $('.image-effect img[src*="on.png"]').removeClass('fadeEffect');
            $('.image-effect img[src*="off.png"]').addClass('fadeEffect');
        }
    }

    $('#myonoffswitch').on('change', updateTheme);
    // Đồng bộ trạng thái ban đầu khi tải trang
    updateTheme();
});
