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
} from "./TransactionsElements";
import Axios from "axios";
import emailjs from "emailjs-com";
import { useTheme } from "styled-components";

const Transactions = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [transactionMethod, setTransactionMethod] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [toAccountNo, setToAccountNo] = useState("");
  const [balance, setBalance] = useState("");
  const [whereTo, setWhereTo] = useState("/transactions");
  const [allowed, setAllowed] = useState(false);
  const [senderAccNo, setSenderAccNo] = useState("");
  const [userId, setUserId] = useState("");
  const [toName, setToName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toEmail, setToEmail] = useState("");

  const updateTransactionType = (e) => {
    setTransactionType(e.target.value);
  };

  const updateTransactionMethod = (e) => {
    setTransactionMethod(e.target.value);
  };

  const updateToAccountNo = (e) => {
    setToAccountNo(e.target.value);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const Warning = () => {
    if (balance < amount) {
      setWhereTo("/transactions");
      return (
        <Text>
          Warning: Not sufficient funds in your account. Transaction will not
          take place.
        </Text>
      );
    } else {
      return <Text></Text>;
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/logged-user").then((result) => {
      setLoggedUser(result.data);
      let acc;
      loggedUser.map((val, key) => {
        setBalance(val.Init_balance);
        setSenderAccNo(val.account_no);
        setUserId(val.user_id);
        setName(val.first_name + " " + val.last_name);
        setEmail(val.email);
      });
    });
  }, [amount]);

  useEffect(() => {
    Axios.post("http://localhost:3001/search-user", {
      toAccountNo: toAccountNo,
    }).then((result) => {
      const re = result.data;
      if (result.data.length === 1) {
        setAllowed(true);
        setWhereTo("/services");
        re.map((val, key) => {
          setToName(val.first_name + " " + val.last_name);
          setToEmail(val.email);
        });
        setToName();
      } else {
        setAllowed(false);
        setWhereTo("/transactions");
      }
    });
  }, [toAccountNo]);

  function sendEmail() {
    let data = {
      to_email: toEmail,
      email: email,
      user_id: userId,
      to_name: toName,
      name: name,
      amount: amount,
      senderAccNo: senderAccNo,
      transactionType: transactionType,
      transactionMethod: transactionMethod,
      date: date,
    };
    emailjs
      .send(
        "service_5a594w9",
        "template_adjlics",
        data,
        "user_cBnePZoA2ClIkg494rYSn"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const addTransaction = () => {
    console.log(allowed);
    if (allowed) {
      sendEmail();
      Axios.post("http://localhost:3001/transactions", {
        userId: userId,
        transactionType: transactionType,
        transactionMethod: transactionMethod,
        date: date,
        toName: toName,
        toAccountNo: toAccountNo,
        amount: amount,
      }).then((result) => {
        console.log("Transaction Inserted!");
        Axios.put("http://localhost:3001/update-sender-salary", {
          senderAccNo: senderAccNo,
          amount: amount,
        }).then(() => {
          console.log("Money Sent, success !");
          Axios.put("http://localhost:3001/update-reciever-salary", {
            toAccountNo: toAccountNo,
            amount: amount,
          }).then(() => {
            console.log("Money Recieved, success !");
          });
        });
      });
    }
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form action="#" onSubmit={addTransaction}>
            <FormH1>Transfer Funds</FormH1>
            <FormLabel htmlFor="for">Transaction Type</FormLabel>
            <Selector onClick={updateTransactionType}>
              <Option>None</Option>
              <Option>Personal</Option>
              <Option>Taxes</Option>
            </Selector>{" "}
            <FormLabel htmlFor="for">Transfer Amount</FormLabel>
            <FormInput
              type="number"
              required
              value={amount}
              onChange={updateAmount}
            />
            <FormLabel htmlFor="for">Transaction Method</FormLabel>
            <Selector onClick={updateTransactionMethod}>
              <Option>None</Option>
              <Option>Express</Option>
              <Option>Budged</Option>
              <Option>Secure</Option>
            </Selector>
            <FormLabel htmlFor="for">Reciever's Account No</FormLabel>
            <FormInput
              type="text"
              required
              value={toAccountNo}
              onChange={updateToAccountNo}
            />
            <FormLabel htmlFor="for">Date</FormLabel>
            <FormInput
              type="date"
              required
              value={date}
              onChange={updateDate}
            />
            <FormButton to={whereTo} onClick={addTransaction}>
              Submit Application
            </FormButton>
            <Warning />
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default Transactions;
