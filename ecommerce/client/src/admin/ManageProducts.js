import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage"
      description="Update Or Delete A Book"
      className="container-fluid"
    >
      <div className="row">
        <div className=" offset-3 col-6">
          <h2>Total Products: {products.length}</h2>
          <hr style={{ border: "1px solid #0059c0" }} />
          <ul
            className="list-group"
            style={{ border: "1px solid #0059c0", marginBottom: "50px" }}
          >
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item"
                style={{ border: "1px solid #0059c0" }}
              >
                <strong style={{ marginRight: "100px" }}>{p.name}</strong>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill mr-1"
                  style={{
                    float: "right",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Delete
                </span>
                <Link
                  to={`/admin/product/update/${p._id}`}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <span
                    className="badge badge-warning badge-pill mr-2"
                    style={{ float: "right", fontSize: "15px" }}
                  >
                    Update
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
