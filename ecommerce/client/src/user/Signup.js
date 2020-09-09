import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Name</b>{" "}
          <i class="fas fa-user" style={{ marginRight: "10px" }}></i>
        </label>{" "}
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Email</b>{" "}
          <i class="fas fa-envelope" style={{ marginRight: "10px" }}></i>
        </label>{" "}
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Password</b>{" "}
          <i class="fas fa-lock" style={{ marginRight: "10px" }}></i>
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-outline-warning">
        Sign Up
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", fontWeight: "500" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none", fontWeight: "500" }}
    >
      Congratulations your account has been created! You can now{" "}
      <Link to="/signin">sign in!</Link>
    </div>
  );

  return (
    <Layout
      title="Sign Up"
      description="Sign up to Book-Berries for great new books!"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default SignUp;
