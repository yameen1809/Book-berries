import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    //console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 1) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length === 1) {
      return `Found ${results.length} product`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h3 className="mt-4 mb-4 ml-5">{searchMessage(searched, results)}</h3>
        <div className="row ml-5 mb-4">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span
        className="input-group-text"
        style={{
          border: "3px solid #4b0082",
        }}
      >
        <div className="input-group input-group-lg">
          <div className="input-group-prepend" style={{ color: "#4b0082" }}>
            <select
              className="btn mr-2"
              onChange={handleChange("category")}
              style={{
                color: "white",
                border: "1px solid #4b0082",
                backgroundColor: "#4b0082",
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control my-search"
            onChange={handleChange("search")}
            placeholder="Search by name"
            style={{
              border: "2px solid white",
            }}
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button
            className="input-group-text"
            style={{
              cursor: "pointer",
              color: "white",
              border: "1px solid #4b0082",
              backgroundColor: "#4b0082",
            }}
          >
            Search
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
