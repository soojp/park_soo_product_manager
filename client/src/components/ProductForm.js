import React, { useState } from "react";
import axios from "axios";

const InputContent = (props) => {
  const { products, setProducts } = props;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const createProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      description,
    };

    console.log(`Created ${newProduct}`);
    axios
      .post("http://localhost:8000/api/product", {
        title,
        price,
        description,
      })
      .then((res) => {
        console.log(res.data);
        setProducts([...products, res.data]);
        setTitle("");
        setPrice("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <form onSubmit={createProduct}>
        <div>
          <label>Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Price </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
      </form>
      <div>
        <button type="submit">Create</button>
      </div>
    </div>
  );
};

export default InputContent;
