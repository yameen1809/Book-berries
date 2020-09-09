import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      className="mb-3"
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{ height: "300px", width: "200px" }}
    />
  </div>
);

export default ShowImage;
