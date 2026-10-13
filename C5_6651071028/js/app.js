/**
 * BÀI 5: SHOP PHỤ KIỆN ĐIỆN THOẠI MINI — GIỎ HÀNG ĐỘNG VỚI VUE.JS (CDN)
 * Sinh viên: Nguyễn Nhật Huy - MSSV: 6651071028
 * File: app.js
 * 
 * ============================================================================
 * GHI CHÚ SO SÁNH QUAN TRỌNG (THEO YÊU CẦU ĐỀ BÀI MỤC 11):
 * "Nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector + cập nhật 
 * DOM thủ công — Vue tự động làm điều này nhờ reactivity (phản ứng dữ liệu hai chiều).
 * Khi mảng cart hoặc biến tuKhoa thay đổi, Vue tự động tính toán lại các computed 
 * và render lại giao diện tương ứng mà lập trình viên không cần can thiệp vào DOM."
 * ============================================================================
 */

const { createApp } = Vue;

createApp({
    data() {
        return {
            // Từ khóa tìm kiếm sản phẩm liên kết 2 chiều qua v-model
            tuKhoa: '',

            // Mảng giỏ hàng (chứa các sản phẩm đã được thêm vào)
            cart: [],

            // Mảng danh sách tối thiểu 8 sản phẩm phụ kiện điện thoại
            products: [
                {
                    id: 1,
                    ten: 'Ốp Lưng Electric Blue Silicone',
                    gia: 150000,
                    anh: '../images/case-electric-blue.jpg',
                    moTa: 'Chất liệu liquid silicone mịn như lụa, chống bám vân tay và bảo vệ camera tuyệt đối.',
                    danhMuc: 'Ốp lưng'
                },
                {
                    id: 2,
                    ten: 'Ốp Lưng MagSafe Chống Sốc Trong Suốt',
                    gia: 180000,
                    anh: '../images/case-clear-magsafe.jpg',
                    moTa: 'Viền TPU đệm khí 4 góc chống va đập, vòng nam châm từ tính hỗ trợ sạc nhanh MagSafe.',
                    danhMuc: 'Ốp lưng'
                },
                {
                    id: 3,
                    ten: 'Đế Sạc Nhanh Không Dây 15W Qi',
                    gia: 350000,
                    anh: '../images/wireless-charger.jpg',
                    moTa: 'Thiết kế siêu mỏng tản nhiệt nhôm nguyên khối, tự ngắt nguồn khi sạc đầy pin.',
                    danhMuc: 'Bộ sạc'
                },
                {
                    id: 4,
                    ten: 'Tai Nghe Active TWS Earbuds Bluetooth 5.3',
                    gia: 590000,
                    anh: '../images/earbuds-tws.jpg',
                    moTa: 'Chống ồn chủ động ANC, chất âm bass uy lực, thời lượng pin liên tục lên tới 32 giờ.',
                    danhMuc: 'Tai nghe'
                },
                {
                    id: 5,
                    ten: 'Cáp Sạc Type-C Bọc Dù Siêu Bền 100W',
                    gia: 120000,
                    anh: '../images/cable-type-c.jpg',
                    moTa: 'Dây bện sợi nylon chịu lực uốn gập 20.000 lần, hỗ trợ truyền dữ liệu và sạc nhanh PD.',
                    danhMuc: 'Cáp sạc'
                },
                {
                    id: 6,
                    ten: 'Pin Sạc Dự Phòng 20.000mAh PD 22.5W',
                    gia: 450000,
                    anh: '../images/power-bank.jpg',
                    moTa: 'Dung lượng khủng sạc 4 lần iPhone, màn hình LED hiển thị % pin chuẩn xác.',
                    danhMuc: 'Pin dự phòng'
                },
                {
                    id: 7,
                    ten: 'Kính Cường Lực Chống Nhìn Trộm 9H',
                    gia: 90000,
                    anh: '../images/screen-protector.jpg',
                    moTa: 'Góc nghiêng 28 độ chống nhìn lén nơi công cộng, phủ nano kháng dầu mượt mà.',
                    danhMuc: 'Kính dán'
                },
                {
                    id: 8,
                    ten: 'Giá Đỡ Điện Thoại Nhôm Gập Gọn',
                    gia: 110000,
                    anh: '../images/phone-stand.jpg',
                    moTa: 'Hợp kim nhôm CNC cao cấp, xoay linh hoạt 2 trục cho góc nhìn công thái học.',
                    danhMuc: 'Phụ kiện khác'
                }
            ],

            // Thông báo popup nhanh khi thêm sản phẩm thành công
            thongBaoThem: null
        };
    },

    computed: {
        /**
         * Computed danhSachLoc:
         * Lọc danh sách sản phẩm theo từ khoá tìm kiếm (tuKhoa).
         * Chuyển đổi về chữ thường để tìm kiếm không phân biệt hoa/thường.
         * Thể hiện triết lý: "UI = function(data)". Khi tuKhoa thay đổi, giao diện tự cập nhật ngay lập tức.
         */
        danhSachLoc() {
            if (!this.tuKhoa.trim()) {
                return this.products;
            }
            const keyword = this.tuKhoa.trim().toLowerCase();
            return this.products.filter(item => 
                item.ten.toLowerCase().includes(keyword) || 
                item.moTa.toLowerCase().includes(keyword) ||
                item.danhMuc.toLowerCase().includes(keyword)
            );
        },

        /**
         * Computed cartCount:
         * Đếm tổng số lượng sản phẩm có trong giỏ hàng để hiển thị trên icon Header và Aside.
         * Tự động phản ứng và cập nhật đồng bộ ở mọi vị trí hiển thị trên trang.
         */
        cartCount() {
            return this.cart.length;
        },

        /**
         * Computed tongTien:
         * Tính toán tổng tiền của tất cả các sản phẩm có trong mảng cart.
         */
        tongTien() {
            return this.cart.reduce((tong, item) => tong + item.gia, 0);
        },

        /**
         * Computed tongTienFormatted:
         * Định dạng số tiền sang chuẩn tiền tệ Việt Nam Đồng (VD: 250.000 VNĐ) để hiển thị thân thiện trên UI.
         */
        tongTienFormatted() {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(this.tongTien);
        }
    },

    methods: {
        /**
         * Method themVaoGio(sanPham):
         * Nhận vào đối tượng sản phẩm và đẩy vào mảng reactive cart.
         * Vue Reactivity sẽ tự động kích hoạt cập nhật số lượng ở header và danh sách ở Aside ngay lập tức.
         */
        themVaoGio(sanPham) {
            // Thêm bản sao sản phẩm vào giỏ hàng
            this.cart.push({ ...sanPham, cartId: Date.now() + Math.random() });

            // Hiển thị thông báo nhỏ thêm thành công
            this.hienThongBao(`Đã thêm "${sanPham.ten}" vào giỏ hàng!`);
        },

        /**
         * Method xoaKhoiGio(index):
         * Xóa sản phẩm tại vị trí index ra khỏi mảng cart.
         * UI giỏ hàng và tổng tiền tự động tính lại ngay lập tức mà không cần querySelector hay reload.
         */
        xoaKhoiGio(index) {
            const tenXoa = this.cart[index].ten;
            this.cart.splice(index, 1);
            this.hienThongBao(`Đã xóa "${tenXoa}" khỏi giỏ hàng.`);
        },

        /**
         * Method xoaToanBoGio():
         * Xóa toàn bộ sản phẩm trong giỏ hàng.
         */
        xoaToanBoGio() {
            if (this.cart.length === 0) return;
            if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
                this.cart = [];
                this.hienThongBao('Đã xóa sạch giỏ hàng.');
            }
        },

        /**
         * Method thanhToan():
         * Mô phỏng quy trình thanh toán giỏ hàng.
         */
        thanhToan() {
            if (this.cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
                return;
            }
            alert(`Xác nhận đặt hàng thành công!\nTổng giá trị đơn hàng: ${this.tongTienFormatted}\nCảm ơn bạn đã mua hàng tại TechGear!`);
            this.cart = [];
        },

        /**
         * Method formatGia(gia):
         * Format giá tiền từng sản phẩm sang chuẩn VND.
         */
        formatGia(gia) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(gia);
        },

        /**
         * Helper hiển thị toast thông báo tạm thời
         */
        hienThongBao(noiDung) {
            this.thongBaoThem = noiDung;
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                this.thongBaoThem = null;
            }, 2500);
        }
    }
}).mount('#app');
