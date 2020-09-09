import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment, { updateLocale } from "moment";
import ShowImage from "./ShowImage";
import {
  addItem,
  updateItem,
  removeItem,
  addWishItem,
  removeWishItem,
  addCompareItem,
  removeCompareItem,
} from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showAddToWishListButton = true,
  showAddToCompareListButton = true,
  showRemoveProductFromCompare = false,
  showRemoveProductFromWish = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectWish, setRedirectWish] = useState(false);
  const [redirectCompare, setRedirectCompare] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mr-2">
            <i class="fas fa-book-open"></i> View Book
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          className="btn btn-outline-warning mt-2 mb-2"
          onClick={addToCart}
        >
          <i class="fas fa-shopping-cart"></i> Add To Cart
        </button>
      )
    );
  };

  const addToWish = () => {
    addWishItem(product, () => {
      setRedirectWish(true);
    });
  };

  const shouldRedirectWish = (redirect) => {
    if (redirectWish) {
      return <Redirect to="/wishlist" />;
    }
  };

  const showAddToWishList = (showAddToWishListButton) => {
    return (
      showAddToWishListButton && (
        <button
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
          onClick={addToWish}
        >
          <i class="fas fa-heart"></i> Add To Wishlist
        </button>
      )
    );
  };

  const addToCompare = () => {
    addCompareItem(product, () => {
      setRedirectCompare(true);
    });
  };

  const shouldRedirectCompare = (redirect) => {
    if (redirectCompare) {
      return <Redirect to="/compare" />;
    }
  };

  const showAddToCompareList = (showAddToCompareListButton) => {
    return (
      showAddToCompareListButton && (
        <button
          className="btn btn-outline-dark mt-2 mb-2 ml-2"
          onClick={addToCompare}
        >
          <i class="fas fa-clone"></i> Add To Compare
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-warning badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group-mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
              <input
                type="number"
                className="form-control"
                value={count}
                onChange={handleChange(product._id)}
              />
            </div>
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          className="btn btn-outline-danger mt-2 mb-2 "
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          <i class="fas fa-minus-circle"></i> Remove Book
        </button>
      )
    );
  };

  const showRemoveWishButton = (showRemoveProductFromWish) => {
    return (
      showRemoveProductFromWish && (
        <button
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
          onClick={() => {
            removeWishItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          <i class="fas fa-minus-circle"></i> Remove Book
        </button>
      )
    );
  };

  const showRemoveCompareButton = (showRemoveProductFromCompare) => {
    return (
      showRemoveProductFromCompare && (
        <button
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
          onClick={() => {
            removeCompareItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          <i class="fas fa-minus-circle"></i> Remove Book
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header name" style={{ fontWeight: "500" }}>
        {product.name}
      </div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        {shouldRedirectWish(redirectWish)}
        {shouldRedirectCompare(redirectCompare)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">
          <b>Price:</b> ${product.price}
        </p>
        <p className="black-9">
          <b>Category:</b> {product.category && product.category.name}
        </p>
        <p className="black-8">
          <b>Added:</b> {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br></br>
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showAddToWishList(showAddToWishListButton)}
        {showAddToCompareList(showAddToCompareListButton)}
        {showRemoveCompareButton(showRemoveProductFromCompare)}
        {showCartUpdateOptions(cartUpdate)}
        {showRemoveWishButton(showRemoveProductFromWish)}
      </div>
    </div>
  );
};

export default Card;
