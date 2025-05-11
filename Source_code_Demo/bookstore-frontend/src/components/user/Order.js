// src/components/user/Order.js
import React from 'react';

function Order({ orders }) {
  return (
    <div className="orders">
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;