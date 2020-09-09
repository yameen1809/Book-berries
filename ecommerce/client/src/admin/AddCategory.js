import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
    setSuccess(false);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Name</b>
          <i class="fas fa-book-medical" style={{ marginLeft: "5px" }}></i>
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-warning text-white font-weight-bold">
        <i class="fas fa-plus"></i> Create Category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">New Category is added: {name} </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">{name} already exists as a category</h3>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5 mb-4">
      <Link
        to="/admin/dashboard"
        style={{
          color: "white",
          backgroundColor: "#0059c0",
          padding: "8px",
          textDecoration: "none",
        }}
      >
        <b>
          <i class="fas fa-arrow-alt-circle-left"></i> Back to Dashboard
        </b>
      </Link>
    </div>
  );

  return (
    <Layout
      title="New Category"
      description={`Hello ${
        isAuthenticated().user.name
      }, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
