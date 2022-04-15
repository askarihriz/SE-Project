import React, { useEffect, useState } from "react";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SigninElements";
import Axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whereto, setWhereto] = useState("/signin");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginChecker = (e) => {
    if (whereto === "/signin") {
      alert("Invalid Email or Password!");
    }
  };

  useEffect(() => {
    updateWhere();
  }, [email, password]);

  const updateWhere = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      setWhereto("/admin");
    } else {
      Axios.post("http://localhost:3001/signed-in-user", {
        email: email,
        password: password,
      }).then((result) => {
        if (result.data.length === 1) {
          setWhereto("/services");
        } else {
          setWhereto("/signin");
        }
      });
    }
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Sign in to your account</FormH1>
            <FormLabel htmlFor="for">Email</FormLabel>
            <FormInput
              type="email"
              required
              value={email}
              onChange={updateEmail}
            />
            <FormLabel htmlFor="for">Password</FormLabel>
            <FormInput
              type="password"
              required
              value={password}
              onChange={updatePassword}
            />
            <FormButton to={whereto} onClick={loginChecker}>
              Continue
            </FormButton>
            <Text>Forgot Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default Signin;
