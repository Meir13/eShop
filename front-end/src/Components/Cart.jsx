import React from "react";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

const Cart = ({ cartItems, updateCartHandler, removeItemHandler }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your cart is empty. <Link to="/">Back to Home Page</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item, i) => (
            <ListGroup.Item key={i}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded img-thumbnail"
                  />
                  <Link to={`/product/${item.token}`}>{item.title}</Link>
                </Col>

                <Col md={3}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    variant="light"
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </Button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    variant="light"
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Button>{" "}
                </Col>

                <Col md={3}>${item.price}</Col>

                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() => {
                      removeItemHandler(item);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Cart;
