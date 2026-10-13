$(document).ready(function () {
    // Khởi tạo datepicker cho ô ngày sinh
    if ($.fn.datepicker) {
        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:2030"
        });
    }

    // Biểu thức chính quy kiểm tra định dạng email
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Biểu thức kiểm tra định dạng ngày (dd/mm/yyyy hoặc dd-mm-yyyy)
    var dateRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;

    // Thêm hàng vào bảng
    $(".add-row").on("click", function () {
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var birthdate = $("#datepicker").val().trim();

        if (name === "") {
            alert("Vui lòng nhập Họ tên (Name)!");
            $("#name").focus();
            return;
        }

        if (email === "") {
            alert("Vui lòng nhập Email!");
            $("#email").focus();
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng! Vui lòng nhập lại (ví dụ: example@gmail.com).");
            $("#email").focus();
            return;
        }

        if (birthdate === "") {
            alert("Vui lòng chọn hoặc nhập Ngày sinh (Birthdate)!");
            $("#datepicker").focus();
            return;
        }

        if (!dateRegex.test(birthdate)) {
            alert("Định dạng ngày tháng không hợp lệ! Vui lòng nhập dạng dd/mm/yyyy.");
            $("#datepicker").focus();
            return;
        }

        // Tạo hàng mới và đưa vào tbody
        var newRow = "<tr>" +
            "<td><input type='checkbox' name='record'></td>" +
            "<td>" + $("<div>").text(name).html() + "</td>" +
            "<td>" + $("<div>").text(email).html() + "</td>" +
            "<td>" + $("<div>").text(birthdate).html() + "</td>" +
            "</tr>";

        $("table tbody").append(newRow);

        // Reset các ô nhập liệu
        $("#name").val("");
        $("#email").val("");
        $("#datepicker").val("");
    });

    // Xóa các hàng đã chọn
    $(".delete-row").on("click", function () {
        var checkedBoxes = $("table tbody input[name='record']:checked");
        if (checkedBoxes.length === 0) {
            alert("Vui lòng tích chọn ít nhất một hàng để xóa!");
            return;
        }

        checkedBoxes.each(function () {
            $(this).closest("tr").remove();
        });
    });
});
