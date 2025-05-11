// src/components/employee/OrderManager.js
import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../services/api';
import { useTranslation } from '../../context/TranslationContext';

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  // Thêm trạng thái cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Số đơn hàng trên mỗi trang

  // Hàm ánh xạ giá trị status (tiếng Anh) sang key dịch
  const getStatusTranslationKey = (status) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'pending_confirmation';
      case 'Confirmed':
        return 'confirmed';
      case 'Shipped':
        return 'shipped';
      case 'Delivered':
        return 'delivered';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'pending_confirmation'; // Giá trị mặc định
    }
  };

  // Sử dụng useCallback để định nghĩa fetchOrders
  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(t('error_fetching_orders'), error);
    }
  }, [t]); // Thêm t vào dependency array

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Thêm fetchOrders vào dependency array để fix warning ESLint

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error(t('error_updating_order_status'), error);
    }
  };

  // Tính toán phân trang
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Tạo danh sách các trang
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="order-manager">
      <h2>{t('order_management')}</h2>
      <div className="orders-table">
        <div className="table-header">
          <span>{t('order_id')}</span>
          <span>{t('customer')}</span>
          <span>{t('total')}</span>
          <span>{t('status')}</span>
          <span>{t('actions')}</span>
        </div>
        {orders.length === 0 ? (
          <div className="table-row">{t('no_orders_available')}</div>
        ) : (
          currentOrders.map((order) => (
            <div key={order.id} className="table-row">
              <span>{order.id}</span>
              <span>{order.customerName || 'Unknown'}</span>
              <span>
                {(order.total || 0).toLocaleString('vi-VN')} VND
              </span>
              <span>
                {t(getStatusTranslationKey(order.status))}
              </span>
              <div className="table-actions">
                <select
                  className="status-select"
                  value={order.status || 'Pending Confirmation'}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Pending Confirmation">{t('pending_confirmation')}</option>
                  <option value="Confirmed">{t('confirmed')}</option>
                  <option value="Shipped">{t('shipped')}</option>
                  <option value="Delivered">{t('delivered')}</option>
                  <option value="Cancelled">{t('cancelled')}</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Thanh phân trang */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('previous')}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderManager;