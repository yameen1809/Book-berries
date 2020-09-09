import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4
          className="card-header"
          style={{ backgroundColor: "#0059c0", color: "white" }}
        >
          Admin Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              <i class="fas fa-plus-square" style={{ marginRight: "10px" }}></i>
              <b>Create Category</b>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              <i class="fas fa-plus-square" style={{ marginRight: "10px" }}></i>
              <b>Create Product</b>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              <i
                class="fas fa-clipboard-list"
                style={{ marginRight: "10px" }}
              ></i>
              <b>View Orders</b>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">
              <i class="fas fa-id-badge" style={{ marginRight: "10px" }}></i>
              <b>Admin Profile</b>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              <i class="fas fa-cogs" style={{ marginRight: "10px" }}></i>
              <b>Manage Products</b>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3
          className="card-header"
          style={{ backgroundColor: "#0059c0", color: "white" }}
        >
          User Information
        </h3>
        <ul className="list-group">
          <li className="list-group-item" style={{ color: "#0059c0" }}>
            <b>
              <i class="fas fa-user" style={{ marginRight: "10px" }}></i>
            </b>
            <b>{name}</b>
          </li>
          <li className="list-group-item" style={{ color: "#0059c0" }}>
            <b>
              <i class="fas fa-envelope" style={{ marginRight: "10px" }}></i>
            </b>
            <b>{email}</b>
          </li>
          <li className="list-group-item" style={{ color: "#0059c0" }}>
            <b>
              <i class="fas fa-user-tag" style={{ marginRight: "10px" }}></i>
            </b>
            <b>{role == 1 ? "Admin" : "Registered User"}</b>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome to your dashboard, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
