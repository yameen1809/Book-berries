import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getWishlist } from "./cartHelpers";
import Card from "./Card";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getWishlist());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Wishlist Has {`${items.length}`} Book(s)</h2>
        <hr style={{ border: "1px solid #0059c0" }} />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToWishListButton={false}
            showRemoveProductFromWish={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noWishlistMessage = () => (
    <h2 className="text-center">
      Your Wishlist Is Empty
      <br /> <Link to="/shop">Add Books To Wishlist?</Link>
      <br />
      <hr style={{ border: "1px solid #0059c0" }} />
      <h1 style={{ fontSize: "200px", color: "#0059c0" }}>
        <i class="fas fa-clipboard-list icon-large"></i>
      </h1>
    </h2>
  );

  return (
    <Layout
      title="Wishlist"
      description="Here are some books you wanted to see later on!"
      className="container-fluid"
    >
      <div className="row">
        <div className="offset-3 col-6">
          {items.length > 0 ? showItems(items) : noWishlistMessage()}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
