import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const removeFromDom = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then((res) => {
        removeFromDom(productId);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/product/${id}`, {
        title,
        price,
        description,
      })
      .then((res) => {
        console.log(res);
        console.log("updated product");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Update a Product</h1>
      <form onSubmit={updateProduct}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            placeholder={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Price</label>
          <br />
          <input
            type="text"
            name="price"
            value={price}
            placeholder={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Description</label>
          <br />
          <input
            type="text"
            name="description"
            value={description}
            placeholder={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={(e) => deleteProduct(product._id)}>Delete</button>
    </div>
  );
};
export default Update;
