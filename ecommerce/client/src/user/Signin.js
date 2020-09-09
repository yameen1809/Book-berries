import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "yameen.irteza@gmail.com",
    password: "nashid1809",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
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
      <button onClick={clickSubmit} className="btn btn-outline-primary">
        Sign In
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

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Sign In"
      description="Sign in to Book-Berries!"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default SignIn;
