import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCompareList } from "./cartHelpers";
import Card from "./Card";

const CompareList = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCompareList());
  }, [run]);

  const showItems = (items) => {
    return (
      <>
        <h2 className="text-center">
          The Comparison List Has {`${items.length}`} Book(s)
        </h2>
        <hr style={{ border: "1px solid #0059c0" }} />
        <div className="d-flex flex-row">
          {items.map((product, i) => (
            <Card
              key={i}
              product={product}
              showAddToCompareListButton={false}
              showRemoveProductFromCompare={true}
              setRun={setRun}
              run={run}
            />
          ))}
        </div>
      </>
    );
  };

  const noComparelistMessage = () => (
    <h2 className="text-center">
      The Comparison List Is Empty
      <br /> <Link to="/shop">Add Books To Compare?</Link>
      <br />
      <hr style={{ border: "1px solid #0059c0" }} />
      <h1 style={{ fontSize: "200px", color: "#0059c0" }}>
        <i class="fas fa-clone icon-large"></i>
      </h1>
    </h2>
  );

  return (
    <Layout
      title="Compare"
      description="Compare books to see which one suits your need!"
      className="container-fluid"
    >
      <div className="row">
        <div className="offset-2 col-8 mb-4">
          {items.length > 0 ? showItems(items) : noComparelistMessage()}
        </div>
      </div>
    </Layout>
  );
};

export default CompareList;
