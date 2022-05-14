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
  Selector,
  Option,
} from "./LoanElements";
import Axios from "axios";
import emailjs from "emailjs-com";

const Loan = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const [email, setEmail] = useState("");
  const [loanType, setLoanType] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [profession, setProfession] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [address, setAddress] = useState("");
  const [income, setIncome] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateLoanType = (e) => {
    setLoanType(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateLoanAmount = (e) => {
    setLoanAmount(e.target.value);
  };

  const updateDuration = (e) => {
    setDuration(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateContactNo = (e) => {
    setContactNo(e.target.value);
  };

  const updateProfession = (e) => {
    setProfession(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const updateIncome = (e) => {
    setIncome(e.target.value);
  };

  function sendEmail() {
    let data = {
      loan_amount: loanAmount,
      loan_type: loanType,
      email: email,
      contact_no: contactNo,
      name: name,
      accountNo: accountNo,
      profession: profession,
    };
    emailjs
      .send(
        "service_r9655qf",
        "template_9yedhc8",
        data,
        "user_XbYd9CbERMB6qt2SkaPpk"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/logged-user").then((result) => {
      setLoggedUser(result.data);
      loggedUser.map((val, key) => {
        setStatus(val.loan_status);
        setAccountNo(val.account_no);
        setContactNo(val.contact_no);
        setEmail(val.email);
        setName(val.first_name + " " + val.last_name);
      });
    });
  }, [loanType]);

  const addLoan = () => {
    console.log(status);
    if (status === "Not Taken") {
      sendEmail();
      Axios.post("http://localhost:3001/loan", {
        loanType: loanType,
        loanAmount: loanAmount,
        duration: duration,
        name: name,
        address: address,
        profession: profession,
        income: income,
        contactNo: contactNo,
        email: email,
        date: date,
        accountNo: accountNo,
      }).then(() => {
        console.log("success !");
      });
      Axios.put("http://localhost:3001/accountholders", {
        accountNo: accountNo,
      }).then(() => {
        console.log("Taken -> Applied success !");
      });
    }
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form action="#" onSubmit={addLoan}>
            <FormH1>Loan Application</FormH1>
            <FormLabel htmlFor="for">Loan Type</FormLabel>
            <Selector onClick={updateLoanType}>
              <Option>None</Option>
              <Option>Government Support</Option>
              <Option>Full Bright</Option>
              <Option>Ahsaas Support</Option>
              <Option>RedCross Aid</Option>
            </Selector>{" "}
            <FormLabel htmlFor="for">Loan Amount</FormLabel>
            <FormInput
              type="number"
              required
              value={loanAmount}
              onChange={updateLoanAmount}
            />
            <FormLabel htmlFor="for">Duration</FormLabel>
            <Selector onClick={updateDuration}>
              <Option>none</Option>
              <Option>6 Months</Option>
              <Option>1 Year</Option>
              <Option>2 Years</Option>
              <Option>5 Years</Option>
              <Option>10 Years</Option>
            </Selector>{" "}
            <FormLabel htmlFor="for">Address</FormLabel>
            <FormInput
              type="text"
              required
              value={address}
              onChange={updateAddress}
            />
            <FormLabel htmlFor="for">Profession</FormLabel>
            <FormInput
              type="text"
              required
              value={profession}
              onChange={updateProfession}
            />
            <FormLabel htmlFor="for">Monthly Income</FormLabel>
            <FormInput
              type="number"
              required
              value={income}
              onChange={updateIncome}
            />
            <FormLabel htmlFor="for">Date</FormLabel>
            <FormInput
              type="date"
              required
              value={date}
              onChange={updateDate}
            />
            <FormButton to="/services" onClick={addLoan}>
              Submit Application
            </FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default Loan;
