import React from "react";
import { Link, withRouter } from "react-router-dom"; //Link is used fo avoiding reloading the page each time we click on it. WithRouter access the props: history - accesses path
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal, itemWishTotal, itemCompareTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { backgroundColor: "black" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul
      className="nav nav-tabs sticky"
      style={{
        backgroundColor: "#320752",
        border: "1px dashed #320752",
        fontSize: "16px",
      }}
    >
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>
          <i class="fab fa-raspberry-pi"></i> Book-Berries
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/shop"
          style={isActive(history, "/shop")}
        >
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/cart"
          style={isActive(history, "/cart")}
        >
          Cart <i class="fas fa-shopping-cart"></i>
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link "
          to="/compare"
          style={isActive(history, "/compare")}
        >
          Compare <i class="fas fa-clone"></i>
          <sup>
            <small className="cart-badge">{itemCompareTotal()}</small>
          </sup>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/wishlist"
          style={isActive(history, "/wishlist")}
        >
          Wishlist <i class="fas fa-heart"></i>
          <sup>
            <small className="wish-badge">{itemWishTotal()}</small>
          </sup>
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={isActive(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/admin/dashboard"
            style={isActive(history, "/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <>
          <li>
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Signin
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Signup
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <li>
          <span
            className="nav-link"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
            style={{ cursor: "Pointer", color: "#ffffff" }}
          >
            Sign Out
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
