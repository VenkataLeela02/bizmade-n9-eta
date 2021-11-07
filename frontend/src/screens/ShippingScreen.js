import Button from "@restart/ui/esm/Button";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import { Container, ListGroup, Row, Col, Table, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import { Form } from "react-bootstrap";
// import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from "../actions/cartActions";
import PaymentScreen from "./PaymentScreen";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [lastName, setLastname] = useState(shippingAddress.lastName);
  const [email, setEmail] = useState(shippingAddress.email);
  const [country, setCountry] = useState(shippingAddress.country);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [phone, setPhone] = useState(shippingAddress.phone);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        city,
        email,
        postalCode,
        country,
        phone,
        email,
      })
    );
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");

    // console.log(
    //   JSON.stringify({
    //     firstName,
    //     lastName,
    //     address,
    //     city,
    //     email,
    //     postalCode,
    //     country,
    //     phone,
    //     email,
    //   })
    // );

    // history.push("/payment");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <p className="fw-bold">Billing Address</p>
            <form>
              <input
                className="firstname col-md-12 m-1"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
              <input
                className="lastname col-md-12 m-1"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastname(e.target.value)}
              ></input>
              <input
                className="state col-md-12 m-1"
                placeholder="Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></input>
              <input
                className="streetaddress col-md-12 m-1"
                placeholder="Street Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <input
                className="town col-md-12 m-1"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></input>
              <input
                className="postalcode col-md-12 m-1"
                placeholder="Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
              <input
                className="email col-md-12 m-1"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="phonenumber col-md-12 m-1"
                placeholder="Phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </form>
            {/* <Button type="submit" variant="primary" onClick={submitHandler}>
              Continue
            </Button> */}
          </Col>
          <Col md={6}>
            <Row>
              <p className="fw-bold">Your Orders</p>

              <Table className="table-bordered">
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr className="no-border p-5">
                      <td>
                        {/* <Image src={item.image} /> */}
                        {item.name}
                      </td>
                      <td>{`Qty: ${item.qty}`}</td>
                    </tr>
                  ))}

                  <tr className="bg-lightblue p-5">
                    <td>Total</td>
                    <td className="fw-bold">{cart.totalPrice}</td>
                  </tr>
                  <tr className="bg-lightblue p-5">
                    <td colspan="2"></td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <FormContainer>
                <p className="fw-bold">Payment Method</p>
                <Form>
                  <Form.Group>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Razorpay"
                        id="Razorpay"
                        name="paymentMethod"
                        value="Razorpay"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      ></Form.Check>
                      <Form.Check
                        type="radio"
                        label="PayPal or Credit Card"
                        id="PayPal"
                        name="paymentMethod"
                        value="PayPal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      ></Form.Check>
                    </Col>
                  </Form.Group>
                </Form>
              </FormContainer>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ marginTop: "30px" }}>
            <Button type="submit" variant="primary" onClick={submitHandler}>
              Continue
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingScreen;
