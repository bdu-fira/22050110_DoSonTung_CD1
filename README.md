# Nhom_5_CD1
* Đề tài "Website bán sách" là một ứng dụng thương mại điện tử được xây dựng theo mô hình MVC (Model - View - Controller) hiện đại, giúp phân chia rõ ràng các thành phần trong hệ thống, hỗ trợ quản lý và phát triển một cách hiệu quả. 
Website được triển khai với Django framework ở phần backend -một framework mạnh mẽ của Python – kết hợp với ReactJS ở phần frontend để xây dựng giao diện người dùng hiện đại, mượt mà. Hệ quản trị cơ sở dữ liệu sử dụng MySQL để lưu trữ và quản lý dữ liệu.

- Mô hình MVC trong hệ thống:
  + Models: Là nơi định nghĩa các lớp dữ liệu, tương ứng với các bảng trong cơ sở dữ liệu MySQL. Models trong Django chịu trách nhiệm quản lý logic nghiệp vụ, truy xuất dữ liệu từ cơ sở dữ liệu và chuyển giao cho controller.
  + Views (ở đây là ReactJS): Là phần giao diện người dùng (UI), nơi trình bày dữ liệu dưới dạng trực quan và tương tác. ReactJS giúp xây dựng các component động, dễ tái sử dụng và tối ưu trải nghiệm người dùng.
  + Controllers (tương ứng với views.py trong Django): Đóng vai trò xử lý các yêu cầu từ phía người dùng (qua React gửi về), tương tác với Models, xử lý logic và trả về kết quả cho giao diện frontend.



- Lợi ích khi áp dụng mô hình này vào website bán sách:
  + Phân tách rõ ràng giữa giao diện người dùng (ReactJS), logic xử lý (Django) và dữ liệu (MySQL), giúp hệ thống dễ bảo trì, mở rộng và phát triển theo nhóm.
  + Django cung cấp môi trường phát triển nhanh, bảo mật cao, tích hợp sẵn nhiều tính năng hỗ trợ như quản lý người dùng, phân quyền, ORM...
  + ReactJS hỗ trợ xây dựng giao diện linh hoạt, tối ưu hiệu năng với khả năng cập nhật từng phần giao diện (SPA – Single Page Application).
  + Hệ quản trị MySQL giúp lưu trữ dữ liệu một cách ổn định, có khả năng mở rộng, phù hợp cho các hệ thống thương mại điện tử thực tế.
  + Hệ thống hướng đến trải nghiệm người dùng hiện đại, tích hợp các chức năng như quản lý sách theo danh mục, tìm kiếm, giỏ hàng, đặt hàng, quản lý đơn hàng và hỗ trợ trực tuyến.

* Giới thiệu nội dung xây dựng trang webbookstore: 
  - Database: 
    + Được xây dựng trên docker bằng file docker-compose.yml - 
    + Bao gồm các bảng dữ liệu: account, user, book, bookDetail, order, statusOrder, category, payment. 
    + Chạy docker bằng lệnh terminal (trong folder DB: docker-compose up -d

  - bookstore_backend: sử dụng framework django. 
    + Xử lý các chức năng, yêu cầu từ frontend và cập nhật vào database. 
    + Chạy server django bằng lệnh terminal (trong folder bookstore_backend)): python manage.py runserver

  - bookstore-frontend: (react) gửi các yêu cầu tới cho backend và trực quan hóa dưới dạng trang web cho người dùng. 
    + Chạy trang web bằng lệnh terminal (trong folder bookstore-frontend): npm start

* Hạn chế của trang web: 
  - Chưa deploy lên cloud, vẫn chỉ đang chạy trên local.
  - Một số chức năng vẫn chưa hoàn thiện