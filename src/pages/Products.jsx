import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";


export default function Products() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json`).then((json) => {
      setProducts(json.data);
      console.log(json.data);
    }).catch(e => {
      console.log("Error getting products", e);
    });
  }, []);

  return (
    <div className="container">
      <div className="my-5 text-center">
        <h1>Products</h1>
        <p className="text-secondary">
          These are the products of your required category
        </p>
      </div>
      <div className="row">
        {products.map((val, key) => (
          <div className="col-md-3 my-3" key={key}>
            <Link className="text-decoration-none" to={`/products/${val.id}`}>
              <Card style={{ width: 250 }}>
                <Card.Img variant="top" src={val.api_featured_image} height={200} />
                <Card.Body>
                  <Card.Title className="card-heading">
                    {val.name }                   
                  </Card.Title>
                  <Card.Text className="price-tag">{val.price}$</Card.Text>
                  <Card.Text title={val.description} className="card-text">{val.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
