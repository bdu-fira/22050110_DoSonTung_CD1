# Nhom_5_CD1
- Giới thiệu nội dung xây dựng trang webbookstore: 
  + DB: được xây dựng trên docker bằng file docker-compose.yml
    Bao gồm các bảng dữ liệu: account, user, book, bookDetail, order, statusOrder, category, payment.

  + bookstore_backend: sử dụng framework django. Xử lý các chức năng, yêu cầu từ frontend và cập nhật vào database. 

  + bookstore-frontend: (react) gửi các yêu cầu tới cho backend và trực quan hóa dưới dạng trang web cho người dùng.