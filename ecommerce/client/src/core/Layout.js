import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <div>
        <h1
          style={{
            border: "4px dashed #0059c0",
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            width: "300px",
            padding: "10px",
            textAlign: "center",
            marginLeft: "570px",
          }}
        >
          {title}
        </h1>
        <h4>{description}</h4>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
