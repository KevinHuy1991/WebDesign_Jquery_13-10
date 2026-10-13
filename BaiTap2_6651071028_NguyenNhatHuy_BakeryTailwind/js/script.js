/**
 * BÀI 2: LANDING PAGE TIỆM BÁNH NGỌT VỚI TAILWIND CSS
 * Sinh viên: Nguyễn Nhật Huy - MSSV: 6651071028
 * File: script.js
 * 
 * Mục đích:
 * Minh chứng Tailwind CSS theo triết lý "utility-first", không đóng gói sẵn
 * JavaScript tương tác component như Bootstrap (ví dụ collapse/navbar).
 * Lập trình viên tự viết JavaScript thuần để xử lý toggle mobile menu và các tương tác.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Khai báo các phần tử điều hướng di động
    const menuToggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // 2. Xử lý sự kiện click vào icon hamburger: toggle class hidden / flex
    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', function () {
            // Kiểm tra trạng thái ẩn/hiện của mobile menu
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                menuToggleBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Đóng mobile menu khi người dùng bấm vào một mục menu điều hướng
        mobileNavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Xử lý Form đặt bánh theo yêu cầu (Interactive Form)
    const customOrderForm = document.getElementById('custom-order-form');
    const formNotice = document.getElementById('order-notice');

    if (customOrderForm) {
        customOrderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const customerName = document.getElementById('order-name').value.trim();
            const cakeType = document.getElementById('order-cake-type').value;

            if (formNotice) {
                formNotice.innerHTML = `
                    <div class="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-sm animate-fade-in">
                        <p class="font-bold flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            Gửi yêu cầu thành công!
                        </p>
                        <p class="mt-1">Cảm ơn bạn <strong>${customerName}</strong>. Bếp Bánh sẽ liên hệ xác nhận đơn đặt món <em>"${cakeType}"</em> trong 15 phút tới.</p>
                    </div>
                `;
                customOrderForm.reset();
            }
        });
    }
});
