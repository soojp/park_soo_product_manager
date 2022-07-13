import axios from 'axios';
import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';

const ProductList = (props) => {
    const {products, setProducts} = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

  return (
    <div>
        <h1>All Products: </h1>
        {
            products.map((product) => (
                <div key={product._id}>
                    <NavLink to={`/product/${product._id}`}>{product.title}</NavLink>
                </div>
            ))
        }
    </div>
  )
}

export default ProductList