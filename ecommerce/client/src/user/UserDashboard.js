import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4
          className="card-header"
          style={{ backgroundColor: "#0059c0", color: "white" }}
        >
          User Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              <i
                class="fas fa-shopping-cart"
                style={{ marginRight: "10px" }}
              ></i>
              <b>My Cart</b>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              <i class="fas fa-user-edit" style={{ marginRight: "10px" }}></i>
              <b>Update Profile</b>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
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

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3
          className="card-header"
          style={{ backgroundColor: "#0059c0", color: "white" }}
        >
          Purchase history
        </h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>
                          <b>Product Name:</b> {p.name}
                        </h6>
                        <h6>
                          <b>Product Price:</b> ${p.price}
                        </h6>
                        <h6>
                          <b>Purchased Date:</b> {moment(p.createdAt).fromNow()}
                        </h6>
                        <hr style={{ border: "1px solid #0059c0" }} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
