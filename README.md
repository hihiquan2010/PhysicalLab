```markdown
# ⚛️ PhysicalLab - Phòng Thí Nghiệm Vật Lí Số

[![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Made with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Chào mừng bạn đến với **PhysicalLab** – Nền tảng mô phỏng các thí nghiệm Vật lí trực quan, sinh động và chính xác. Dự án được thiết kế nhằm hỗ trợ học sinh, giáo viên trong việc giảng dạy và học tập môn Vật lí thông qua các mô hình tương tác thời gian thực (Real-time Interactive Simulations).

## 👨‍🏫 Thông Tin Tác Giả & Đơn Vị

- **Người thực hiện:** Gia Uy
- **Đơn vị chủ quản:** Trường THPT Bình Chánh
- **Định hướng:** Phát triển bởi học sinh, dành cho cộng đồng học sinh, với tiêu chí chuyên nghiệp, chính xác và dễ tiếp cận nhất.

## 🌟 Tính Năng Nổi Bật

- **Mô phỏng Vật lí chính xác:** Ứng dụng các công thức và định luật Vật lí thực tế (Động học, Động lực học, Dao động, Sóng).
- **Đồ họa trực quan:** Giao diện phong cách "Modern Lab" sạch sẽ, độ tương phản cao, tập trung vào chi tiết thí nghiệm và đồ thị.
- **Tương tác thời gian thực:** Thay đổi các thông số (Biên độ, Tần số, Hệ số ma sát...) và quan sát sự thay đổi ngay lập tức trên màn hình.
- **Đồ thị động:** Hiển thị đồ thị dao động (x-t) cuộn liên tục, giúp học sinh dễ dàng liên hệ giữa toán học và chuyển động thực tế.
- **HUD Thông số:** Bảng điều khiển hiển thị các giá trị Li độ, Vận tốc, Gia tốc theo thời gian thực.
- **Tương thích đa thiết bị:** Tự động co giãn (Responsive) phù hợp với mọi kích thước màn hình.

## 📚 Danh Sách Các Thí Nghiệm

Hiện tại, dự án đã hoàn thiện các bài mô phỏng thuộc Chương I - Dao động:

| STT | Tên Bài Học | Nội Dung Mô Phỏng |
|:---:|:---|:---|
| **1** | [Dao động điều hòa](./simulations/bai1-dao-dong-dieu-hoa.html) | Con lắc lò xo, phương trình \(x, v, a\). Có thể kéo thả vật và thay đổi \(A, \omega\). |
| **6** | [Dao động tắt dần](./simulations/bai6-dao-dong-tat-dan.html) | Mô phỏng lực ma sát khô, quan sát biên độ giảm dần và vật dừng hẳn. |
| **7** | [Hiện tượng cộng hưởng](./simulations/bai7-cong-huong.html) | Đồ thị đường cong cộng hưởng, sự phụ thuộc của biên độ vào tần số ngoại lực. |
| **8** | [Mô tả sóng](./simulations/bai8-mo-ta-song.html) | Kênh sóng nước dạng mặt cắt, sự lan truyền năng lượng và dao động tại chỗ của phần tử môi trường. |

## 🏗️ Cấu Trúc Dự Án

Dự án được xây dựng hoàn toàn bằng **Vanilla JavaScript** (không sử dụng framework nặng) để đảm bảo tốc độ và khả năng tùy biến cao.

```text
/physics-simulation-hub
│
├── index.html               # Trang chủ (Danh sách các bài)
├── README.md                # Tài liệu dự án
│
├── /assets
│   └── /css
│       └── style.css        # CSS dùng chung (Modern Lab Style)
│
├── /simulations             # Chứa các trang HTML mô phỏng
│   ├── bai1-dao-dong-dieu-hoa.html
│   ├── bai6-dao-dong-tat-dan.html
│   ├── bai7-cong-huong.html
│   └── bai8-mo-ta-song.html
│
└── /js                      # Chứa logic vật lý & đồ họa Canvas
    ├── sim1.js
    ├── sim6.js
    ├── sim7.js
    └── sim8.js
```

## 🚀 Hướng Dẫn Sử Dụng

1. **Truy cập trực tuyến:** Bạn có thể trải nghiệm ngay lập tức thông qua GitHub Pages (nếu đã bật) hoặc clone dự án về máy.
2. **Chạy cục bộ (Local):**
   - Tải mã nguồn về máy.
   - Mở file `index.html` bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).
   - Không cần cài đặt thêm bất kỳ môi trường (Node.js, Python...) nào.
3. **Sử dụng trong mô phỏng:**
   - Sử dụng các thanh trượt (Sliders) ở cột bên trái để thay đổi thông số.
   - Quan sát sự thay đổi của vật thể trên Canvas và số liệu trên thanh HUD.

## 🛠️ Công Nghệ Sử Dụng

- **HTML5 Canvas API:** Vẽ và xử lý đồ họa chuyển động mượt mà (60fps).
- **CSS3 (Flexbox, Grid, Custom Properties):** Thiết kế giao diện hiện đại, tối ưu không gian hiển thị.
- **JavaScript (ES6+):** Xử lý logic vật lý, phương trình vi phân, và vòng lặp `requestAnimationFrame`.
- **MathJax:** Hiển thị công thức Vật lý chuẩn LaTeX.

## 🔗 Liên Kết

- **Repository:** [https://github.com/hihiquan2010/PhysicalLab](https://github.com/hihiquan2010/PhysicalLab)

## 📄 Giấy Phép

Dự án này được phân phối dưới giấy phép **MIT License**. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối lại mã nguồn cho mục đích học tập và giảng dạy.

---
*Được phát triển với ❤️ bởi Gia Uy - THPT Bình Chánh.*
```
