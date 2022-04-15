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
} from "./ServicesPageElements";

const ServicePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whereto, setWhereto] = useState("/signin");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    updateWhere();
  }, [email, password]);

  const updateWhere = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      setWhereto("/admin");
    } else {
      setWhereto("/signin");
    }
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Pick A Service</FormH1>
            <FormButton to="/projectUpdate">Project Update</FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default ServicePage;
