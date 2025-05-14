# Nhom_5_CD1
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