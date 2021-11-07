import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles.css";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="card-img-top" />
      </Link>

      <Card.Body className="text-left">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text
          // style={{ color: "#0fafe9", fontSize: "medium", fontWeight: "500" }}
          as="h3"
        >
          {product.manufacturer}
        </Card.Text>
        <Card.Text
          style={{ color: "black", fontSize: "medium", fontWeight: "500" }}
          as="h3"
        >
          &#8377;{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
