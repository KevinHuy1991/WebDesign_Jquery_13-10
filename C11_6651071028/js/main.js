$(document).ready(function () {
    $('#fileupload').on('change', function () {
        if (this.files && this.files.length > 0) {
            var file = this.files[0];
            var fullName = file.name;
            var lastDot = fullName.lastIndexOf('.');
            var fileName = (lastDot !== -1) ? fullName.substring(0, lastDot) : fullName;
            var fileExtension = (lastDot !== -1) ? fullName.substring(lastDot + 1) : 'Không có';

            $('.filename').html(
                'Tên file: <strong>' + fileName + '</strong><br>' +
                'Phần mở rộng: <strong>.' + fileExtension + '</strong>'
            );
        } else {
            $('.filename').text('Chưa chọn file');
        }
    });
});
