import React, { useState, useEffect } from "react";
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
} from "./ComplainElements";
import Axios from "axios";

const Complain = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [complain, setComplain] = useState("");
  const [subject, setSubject] = useState("");

  const updateUserId = (e) => {
    setUserId(e.target.value);
  };

  const updateComplain = (e) => {
    setComplain(e.target.value);
  };

  const updateSubject = (e) => {
    setSubject(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/logged-user").then((result) => {
      setLoggedUser(result.data);
      loggedUser.map((val, key) => {
        setUserId(val.user_id);
      });
    });
  }, [subject]);

  const addComplain = () => {
    console.log(userId);
    Axios.post("http://localhost:3001/complain", {
      subject: subject,
      userId: userId,
      complain: complain,
      date: date,
    }).then(() => {
      console.log("Complain Inserted! success !");
    });
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form action="#" onSubmit={addComplain}>
            <FormH1>Complain Form</FormH1>
            <FormLabel htmlFor="for">Subject</FormLabel>
            <FormInput
              type="text"
              required
              value={subject}
              onChange={updateSubject}
            />
            <FormLabel htmlFor="for">Complain</FormLabel>
            <FormInput
              type="text"
              required
              value={complain}
              onChange={updateComplain}
            />
            <FormLabel htmlFor="for">Date</FormLabel>
            <FormInput
              type="date"
              required
              value={date}
              onChange={updateDate}
            />
            <FormButton to="/services" onClick={addComplain}>
              Submit Application
            </FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default Complain;
