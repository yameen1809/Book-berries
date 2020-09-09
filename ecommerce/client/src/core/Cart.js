import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart, removeItem } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>You Cart Has {`${items.length}`} book(s)</h2>
        <hr style={{ border: "1px solid #0059c0" }} />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2 className="text-center">
      Your Cart Is Empty
      <br /> <Link to="/shop">Keep On Shopping?</Link>
      <br />
      <hr style={{ border: "1px solid #0059c0" }} />
      <h1 style={{ fontSize: "200px", color: "#0059c0" }}>
        <i class="fas fa-cart-plus icon-large"></i>
      </h1>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items! Add, Checkout or Continue Shopping!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4 ">Cart Summary</h2>
          <hr style={{ border: "1px solid #0059c0" }} />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
