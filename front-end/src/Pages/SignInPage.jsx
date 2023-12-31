import { React, useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Title from "../Components/shared/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Context/Store";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_SIGNIN } from "../Reducers/Actions";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", { email, password });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Title title={"Sign In"}></Title>
      <h1 className="my-3">Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signUp?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SignInPage;
