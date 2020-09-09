import React, { useState, useEffect, useImperativeHandle } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, email, password, error, success } = values;

  const init = (userId) => {
    //console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Name</b>
          <i class="fas fa-user" style={{ marginLeft: "7px" }}></i>
        </label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Email</b>
          <i class="fas fa-envelope" style={{ marginLeft: "7px" }}></i>
        </label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Password</b>
          <i class="fas fa-lock" style={{ marginLeft: "7px" }}></i>
        </label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
          style={{ color: "#0059c0", border: "2px solid #0059c0" }}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-outline-warning">
        <b>
          <i class="fas fa-edit"></i> Update Profile
        </b>
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container"
    >
      <h2>
        <i class="fas fa-user-edit" style={{ marginRight: "7px" }}></i>Update
        Profile{" "}
      </h2>
      <hr style={{ border: "1px solid #0059c0" }} />
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
