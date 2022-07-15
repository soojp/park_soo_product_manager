import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ProductList.css";

const ProductList = (props) => {
  const { removeFromDom, products, setProducts } = props;

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then((res) => {
        removeFromDom(productId);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>All Products: </h1>
      {products.map((product) => (
        <div className="product-list" key={product._id}>
          <div className="row">
            <NavLink to={`/product/${product._id}`}>{product.title}</NavLink>
          </div>
          <div className="row">
            <NavLink to={`/product/edit/${product._id}`}>Edit</NavLink>
          </div>
          <div className="row">
            <button onClick={(e) => deleteProduct(product._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
