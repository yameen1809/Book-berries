import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        //populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        //load categories
        initCategories();
      }
    });
  };
  //load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  //the form data that we are going to send to the backend as a form.
  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            redirectToProfile: true,
            error: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4 style={{ color: "#0059c0" }}>
        <i class="fas fa-camera-retro"></i> Upload Photo
      </h4>
      <div className="form-group">
        <label
          className="btn btn-secondary"
          style={{ backgroundColor: "#0059c0" }}
        >
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            style={{ color: "white", fontWeight: "bold" }}
          />
        </label>
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Name</b>
          <i class="fas fa-book" style={{ marginLeft: "5px" }}></i>
        </label>
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
          <b>Description</b>
          <i class="fas fa-comment-medical" style={{ marginLeft: "5px" }}></i>
        </label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Price</b>
          <i class="far fa-money-bill-alt" style={{ marginLeft: "5px" }}></i>
        </label>
        <input
          onChange={handleChange("price")}
          className="form-control"
          type="number"
          value={price}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Category</b>
          <i class="fas fa-book-medical" style={{ marginLeft: "5px" }}></i>
        </label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          style={{ border: "2px solid #0059c0" }}
        >
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Quantity</b>
          <i class="fas fa-list-ol" style={{ marginLeft: "5px" }}></i>
        </label>
        <input
          onChange={handleChange("quantity")}
          className="form-control"
          type="number"
          value={quantity}
          style={{ border: "2px solid #0059c0" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "#0059c0" }}>
          <b>Shipping</b>
          <i class="fas fa-shipping-fast" style={{ marginLeft: "5px" }}></i>
        </label>
        <select
          onChange={handleChange("shipping")}
          className="form-control"
          style={{ border: "2px solid #0059c0" }}
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-warning">
        <b>
          <i class="fas fa-edit"></i> Update Product
        </b>
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct} is updated!`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

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

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout
      title="Edit Product"
      description={`Hello ${user.name}, ready to update a product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
          {redirectUser()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
