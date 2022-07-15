import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/product/${id}` , {
        title,
        price,
        description
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Update;
