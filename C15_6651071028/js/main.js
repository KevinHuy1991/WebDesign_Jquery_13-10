$(document).ready(function () {
    // Mặc định kích hoạt tab đầu tiên
    $('.tab li:first-child').addClass('active');
    $('.tab-content .tab-item:first-child').show();

    // Xử lý sự kiện click chuyển tab
    $('.tab li a').on('click', function (e) {
        e.preventDefault();

        // Đổi trạng thái active của tab tiêu đề
        $('.tab li').removeClass('active');
        $(this).parent('li').addClass('active');

        // Ẩn tất cả nội dung tab và hiển thị nội dung của tab được chọn
        var activeTab = $(this).attr('href');
        $('.tab-content .tab-item').hide();
        $(activeTab).fadeIn(200);
    });
});
