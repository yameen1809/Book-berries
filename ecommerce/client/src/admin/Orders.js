import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h2 className="text-danger">Total Orders: {orders.length} orders</h2>
      );
    } else {
      return <h2 className="text-danger">No Orders</h2>;
    }
  };

  const showInput = (key, value) => (
    <div className=" input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div
          className="input-group-text"
          style={{
            backgroundColor: "#0059c0",
            color: "white",
            border: "1px solid #0059c8",
          }}
        >
          {key}
        </div>
      </div>
      <input
        type="text"
        value={value}
        className="form-control"
        readOnly
        style={{
          color: "black",
          border: "2px solid #0059c8",
          fontWeight: "bold",
        }}
      />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    //console.log("update order status");
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3
        className="mark mb-4 pl-2"
        style={{
          backgroundColor: "#0059c0",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Status: {o.status}
      </h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
        style={{ border: "2px solid #0059c0" }}
      >
        <option style={{ color: "#0059c0", fontWeight: "bold" }}>
          Update Status
        </option>
        {statusValues.map((status, index) => (
          <option key={index} value={status} style={{ color: "black" }}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`Hello ${
        isAuthenticated().user.name
      }, manage all the orders here!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          <hr style={{ border: "1px solid #0059c0" }} />

          {orders.map((o, oIndex) => {
            return (
              <div className="mt-5" key={oIndex}>
                <h2 className="mb-5">
                  <span
                    style={{
                      padding: "5px",
                      borderRadius: "8px",
                      backgroundColor: "#ffc314",
                      color: "black",
                    }}
                  >
                    <i
                      class="fas fa-receipt"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Order ID: {o._id}
                  </span>
                </h2>
                <ul
                  className="list-group mb-2"
                  style={{ border: "2px solid #0059c0" }}
                >
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0" }}
                  >
                    {showStatus(o)}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0", color: "black" }}
                  >
                    <b>Transaction ID:</b> {o.transaction_id}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0", color: "black" }}
                  >
                    <b>Amount:</b> ${o.amount}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0", color: "black" }}
                  >
                    <b>Ordered By:</b> {o.user.name}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0", color: "black" }}
                  >
                    <b>Ordered:</b> {moment(o.createdAt).fromNow()}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ border: "2px solid #0059c0", color: "black" }}
                  >
                    <b>Delivery Address:</b> {o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb -4 ">
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{ padding: "20px", border: "2px solid black" }}
                  >
                    {showInput("Product Name", p.name)}
                    {showInput("Product Price", p.price)}
                    {showInput("Product Quantity", p.count)}
                    {showInput("Product ID", p._id)}
                  </div>
                ))}
                <hr style={{ border: "1px solid #0059c0" }} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
