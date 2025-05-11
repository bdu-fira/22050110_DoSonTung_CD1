// src/context/TranslationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const TranslationContext = createContext();

const translations = {
  vi: {
    // Common
    language_vi: 'Tiếng Việt',
    language_en: 'English',
    home: 'Trang chủ',
    books: 'Sách',
    cart: 'Giỏ hàng',
    profile: 'Hồ sơ',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    admin: 'Quản trị',
    employee: 'Nhân viên',
    add_to_cart: 'Thêm vào giỏ',
    out_of_stock: 'Hết hàng',
    quantity: 'Số lượng',
    search_by_title: 'Tìm theo tiêu đề...',
    filter_by_genre: 'Lọc theo thể loại',
    all_genres: 'Tất cả thể loại',
    price: 'Giá',
    author: 'Tác giả',
    genre: 'Thể loại',
    publisher: 'Nhà xuất bản',
    language: 'Ngôn ngữ',
    description: 'Mô tả',
    no_description: 'Không có mô tả',
    back_to_books: 'Quay lại sách',
    contact: 'Liên hệ',
    about_us: 'Giới thiệu',
    quick_links: 'Liên kết nhanh',
    phone: 'Điện thoại',
    your_trusted_online_bookstore_since_2025: 'Cửa hàng sách trực tuyến đáng tin cậy của bạn từ năm 2025',
    previous: 'Trước',
    next: 'Tiếp theo',

    // Home
    welcome_to_our_bookstore: 'Chào mừng đến với cửa hàng sách của chúng tôi',
    discover_your_next_favorite_book_with_us: 'Khám phá cuốn sách yêu thích tiếp theo của bạn với chúng tôi',
    browse_books: 'Duyệt sách ngay',
    search_for_books: 'Tìm kiếm sách...',
    wide_selection: 'Lựa chọn đa dạng',
    thousands_of_books_across_all_genres: 'Hàng ngàn cuốn sách thuộc mọi thể loại',
    fast_delivery: 'Giao hàng nhanh chóng',
    get_your_books_delivered_quickly: 'Nhận sách của bạn được giao nhanh chóng',
    great_prices: 'Giá cả hợp lý',
    competitive_prices_and_regular_discounts: 'Giá cả cạnh tranh và giảm giá thường xuyên',

    // Profile
    my_profile: 'Hồ sơ người dùng',
    name: 'Tên',
    email: 'Email',
    role: 'Vai trò',
    edit_profile: 'Cập nhật hồ sơ',
    change_password: 'Đổi mật khẩu',
    save_changes: 'Lưu thay đổi',
    cancel: 'Hủy',
    new_password: 'Mật khẩu mới',
    confirm_new_password: 'Xác nhận mật khẩu mới',
    current_password: 'Mật khẩu hiện tại',

    // Login
    sign_in: 'Đăng nhập vào tài khoản của bạn',
    forgot_password: 'Quên mật khẩu?',
    dont_have_account: 'Chưa có tài khoản?',
    invalid_credentials: 'Email hoặc mật khẩu không đúng',

    // Register
    password: 'Mật khẩu',
    create_account: 'Tạo tài khoản của bạn',
    join_our_bookstore_community: 'Tham gia cộng đồng cửa hàng sách của chúng tôi',
    enter_your_name: 'Nhập tên của bạn',
    enter_your_email: 'Nhập email của bạn',
    create_a_password: 'Tạo mật khẩu',
    confirm_password: 'Xác nhận mật khẩu',
    confirm_your_password: 'Xác nhận mật khẩu của bạn',
    already_have_an_account: 'Đã có tài khoản?',
    login_here: 'Đăng nhập tại đây',

    // Forgot Password
    enter_your_email_to_reset_password: 'Nhập email của bạn để đặt lại mật khẩu',
    send_reset_link: 'Gửi liên kết đặt lại',
    back_to_login: 'Quay lại đăng nhập',
    password_reset_link_sent: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.',
    failed_to_send_reset_link: 'Không thể gửi liên kết đặt lại. Vui lòng thử lại.',
    email_not_found: 'Email không tồn tại',

    // Cart
    shopping_cart: 'Giỏ hàng của bạn',
    your_cart_is_currently_empty: 'Giỏ hàng của bạn hiện đang trống',
    total: 'Tổng cộng',
    proceed_to_checkout: 'Tiến hành thanh toán',
    continue_shopping: 'Tiếp tục mua sắm',
    items: 'Mặt hàng',

    // Checkout
    checkout: 'Thanh toán',
    order_summary: 'Tóm tắt đơn hàng',
    shipping_info: 'Thông tin vận chuyển',
    full_name: 'Họ và tên',
    address: 'Địa chỉ',
    payment_method: 'Phương thức thanh toán',
    cash_on_delivery: 'Thanh toán khi nhận hàng',
    credit_card: 'Thẻ tín dụng',
    payment_date: 'Ngày thanh toán',
    place_order: 'Đặt hàng',
    please_login_to_place_order: 'Vui lòng đăng nhập để đặt hàng',
    pending_confirmation: 'Đang chờ xác nhận',
    order_placed_successfully: 'Đặt hàng thành công! Đang chờ xác nhận từ nhân viên',
    error_placing_order: 'Lỗi khi đặt hàng:',
    failed_to_place_order: 'Không thể đặt hàng. Vui lòng thử lại',

    // EmployeeDashboard
    employee_dashboard: 'Bảng điều khiển nhân viên',
    manage_books_orders_users: 'Quản lý sách, đơn hàng và người dùng',
    book_manager: 'Quản lý sách',
    order_manager: 'Quản lý đơn hàng',
    user_manager: 'Quản lý người dùng',

    // BookManager
    book_inventory: 'Kho sách',
    add_new_book: 'Thêm sách mới',
    cover_image: 'Hình ảnh bìa',
    book: 'Sách',
    title: 'Tiêu đề',
    error_adding_book: 'Lỗi khi thêm sách',
    error_invalid_book_id: 'ID sách không hợp lệ',
    error_book_not_found: 'Không tìm thấy sách',
    error_updating_book: 'Lỗi khi cập nhật sách',
    confirm_delete_book: 'Bạn có chắc chắn muốn xóa sách này không?',
    error_deleting_book: 'Lỗi khi xóa sách',

    // OrderManager
    order_management: 'Quản lý đơn hàng',
    order_id: 'Mã đơn hàng',
    customer: 'Khách hàng',
    status: 'Trạng thái',
    actions: 'Hành động',
    no_orders_available: 'Không có đơn hàng nào',
    confirmed: 'Đã xác nhận',
    shipped: 'Đã giao',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
    error_fetching_orders: 'Lỗi khi lấy đơn hàng',
    error_updating_order_status: 'Lỗi khi cập nhật trạng thái đơn hàng',

    // UserManager
    user_management: 'Quản lý người dùng',
    username_email: 'Tên đăng nhập (Email)',

    // AdminDashboard
    admin_dashboard: 'Bảng điều khiển quản trị',
    manage_employees_and_system_operations: 'Quản lý nhân viên và các hoạt động hệ thống',

    // EmployeeManager
    manage_employees: 'Quản lý nhân viên',
    add_new_employee: 'Thêm nhân viên mới',
    update_employee: 'Cập nhật nhân viên',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    no_employees: 'Không có nhân viên nào',
    email_already_exists: 'Email đã tồn tại',
    error_adding_employee: 'Lỗi khi thêm nhân viên',
    error_updating_employee: 'Lỗi khi cập nhật nhân viên',
    error_deleting_employee: 'Lỗi khi xóa nhân viên',
    confirm_delete_employee: 'Bạn có chắc chắn muốn xóa nhân viên này không?'
  },
  en: {
    // Common
    language_vi: 'Vietnamese',
    language_en: 'English',
    home: 'Home',
    books: 'Books',
    cart: 'Cart',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    admin: 'Admin',
    employee: 'Employee',
    add_to_cart: 'Add to Cart',
    out_of_stock: 'Out of Stock',
    quantity: 'Quantity',
    search_by_title: 'Search by title...',
    filter_by_genre: 'Filter by genre',
    all_genres: 'All genres',
    price: 'Price',
    author: 'Author',
    genre: 'Genre',
    publisher: 'Publisher',
    language: 'Language',
    description: 'Description',
    no_description: 'No description',
    back_to_books: 'Back to Books',
    contact: 'Contact',
    about_us: 'About Us',
    quick_links: 'Quick Links',
    phone: 'Phone',
    your_trusted_online_bookstore_since_2025: 'Your trusted online bookstore since 2025',
    previous: 'Previous',
    next: 'Next',

    // Home
    welcome_to_our_bookstore: 'Welcome to our bookstore',
    discover_your_next_favorite_book_with_us: 'Discover your next favorite book with us',
    browse_books: 'Browse Books Now',
    search_for_books: 'Search for books...',
    wide_selection: 'Wide Selection',
    thousands_of_books_across_all_genres: 'Thousands of books across all genres',
    fast_delivery: 'Fast Delivery',
    get_your_books_delivered_quickly: 'Get your books delivered quickly',
    great_prices: 'Great Prices',
    competitive_prices_and_regular_discounts: 'Competitive prices and regular discounts',

    // Profile
    my_profile: 'User Profile',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    edit_profile: 'Edit Profile',
    change_password: 'Change Password',
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    new_password: 'New Password',
    confirm_new_password: 'Confirm New Password',
    current_password: 'Current Password',

    // Login
    sign_in: 'Sign in to your account',
    forgot_password: 'Forgot Password?',
    dont_have_account: 'Don`t have an account?',
    invalid_credentials: 'Invalid email or password',

    // Register
    password: 'Password',
    create_account: 'Create your account',
    join_our_bookstore_community: 'Join our bookstore community',
    enter_your_name: 'Enter your name',
    enter_your_email: 'Enter your email',
    create_a_password: 'Create a password',
    confirm_password: 'Confirm Password',
    confirm_your_password: 'Confirm your password',
    already_have_an_account: 'Already have an account?',
    login_here: 'Login here',

    // Forgot Password
    enter_your_email_to_reset_password: 'Enter your email to reset your password',
    send_reset_link: 'Send Reset Link',
    back_to_login: 'Back to Login',
    password_reset_link_sent: 'A password reset link has been sent to your email.',
    failed_to_send_reset_link: 'Failed to send reset link. Please try again.',
    email_not_found: 'Email not found',

    // Cart
    shopping_cart: 'Your Cart',
    your_cart_is_currently_empty: 'Your cart is currently empty',
    total: 'Total',
    proceed_to_checkout: 'Proceed to Checkout',
    continue_shopping: 'Continue Shopping',
    items: 'Items',

    // Checkout
    checkout: 'Checkout',
    order_summary: 'Order Summary',
    shipping_info: 'Shipping Information',
    full_name: 'Full Name',
    address: 'Address',
    payment_method: 'Payment Method',
    cash_on_delivery: 'Cash on Delivery',
    credit_card: 'Credit Card',
    payment_date: 'Payment Date',
    place_order: 'Place Order',
    please_login_to_place_order: 'Please log in to place an order',
    pending_confirmation: 'Pending Confirmation',
    order_placed_successfully: 'Order placed successfully! Waiting for employee confirmation',
    error_placing_order: 'Error placing order:',
    failed_to_place_order: 'Failed to place order. Please try again',

    // EmployeeDashboard
    employee_dashboard: 'Employee Dashboard',
    manage_books_orders_users: 'Manage books, orders, and users',
    book_manager: 'Book Manager',
    order_manager: 'Order Manager',
    user_manager: 'User Manager',

    // BookManager
    book_inventory: 'Book Inventory',
    add_new_book: 'Add New Book',
    cover_image: 'Cover Image',
    book: 'Book',
    title: 'Title',
    error_adding_book: 'Error adding book',
    error_invalid_book_id: 'Invalid book ID',
    error_book_not_found: 'Book not found',
    error_updating_book: 'Error updating book',
    confirm_delete_book: 'Are you sure you want to delete this book?',
    error_deleting_book: 'Error deleting book',

    // OrderManager
    order_management: 'Order Management',
    order_id: 'Order ID',
    customer: 'Customer',
    status: 'Status',
    actions: 'Actions',
    no_orders_available: 'No orders available',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    error_fetching_orders: 'Error fetching orders',
    error_updating_order_status: 'Error updating order status',

    // UserManager
    user_management: 'User Management',
    username_email: 'Username (Email)',

    // AdminDashboard
    admin_dashboard: 'Admin Dashboard',
    manage_employees_and_system_operations: 'Manage employees and system operations',

    // EmployeeManager
    manage_employees: 'Manage Employees',
    add_new_employee: 'Add New Employee',
    update_employee: 'Update Employee',
    edit: 'Edit',
    delete: 'Delete',
    no_employees: 'No employees',
    email_already_exists: 'Email already exists',
    error_adding_employee: 'Error adding employee',
    error_updating_employee: 'Error updating employee',
    error_deleting_employee: 'Error deleting employee',
    confirm_delete_employee: 'Are you sure you want to delete this employee?'
  }
};

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'vi');

  const t = (key) => {
    return translations[language][key] || key; // Return key if translation not found
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Dynamic translation (for future API-based translation if needed)
  const translateDynamic = async (text, targetLang = language) => {
    return text; // Replace with API call (e.g., Google Translate) if needed
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, t, switchLanguage, translateDynamic }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);