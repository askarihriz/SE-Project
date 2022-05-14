import React, { useEffect, useState } from "react";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  Text,
  Divi,
  Text2,
  Accounts,
  TextSection,
  Row,
  Spacer,
  SmallSpacer,
} from "./CustomerDetailsElements";
import Axios from "axios";

const CutomerDetails = () => {
  const [BankAccounts, setBankAccounts] = useState([]);
  const [sentTransactions, setSentTransactions] = useState([]);
  const [recievedTransactions, setRecievedTransactions] = useState([]);
  const [sentComplain, setSentComplain] = useState([]);
  const [sentPaymentRequests, setSentPaymentRequests] = useState([]);
  const [recievedPaymentRequests, setRecievedPaymentRequests] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/logged-user").then((result) => {
      setBankAccounts(result.data);
      let arr = result.data;
      let userId;
      let accountNo;
      arr.map((val, key) => {
        userId = val.user_id;
        accountNo = val.account_no;
        console.log(userId + "   " + accountNo);
        Axios.post("http://localhost:3001/logged-user-sent-transactions", {
          userId: userId,
        }).then((result) => {
          setSentTransactions(result.data);
          Axios.post(
            "http://localhost:3001/logged-user-recieved-transactions",
            { accountNo: accountNo }
          ).then((result) => {
            setRecievedTransactions(result.data);
            Axios.post("http://localhost:3001/logged-user-sent-complains", {
              userId: userId,
            }).then((result) => {
              setSentComplain(result.data);
              Axios.post(
                "http://localhost:3001/logged-user-sent-paymentrequests",
                { userId: userId }
              ).then((result) => {
                setSentPaymentRequests(result.data);
                Axios.post(
                  "http://localhost:3001/logged-user-recieved-paymentrequests",
                  { accountNo: accountNo }
                ).then((result) => {
                  setRecievedPaymentRequests(result.data);
                });
              });
            });
          });
        });
      });
    });
  }, []);

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Customer Account Details</FormH1>
            <Accounts>
              {BankAccounts.map((val, key) => {
                return (
                  <Divi>
                    <Row>
                      <TextSection>
                        <Text>Id: </Text>
                        <Text2>{val.user_id}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Name: </Text>
                        <Text2>
                          {val.first_name} {val.last_name}
                        </Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Age: </Text>
                        <Text2>{val.age}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Country: </Text>
                        <Text2>{val.country}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Email </Text>
                        <Text2>{val.email}</Text2>
                      </TextSection>
                    </Row>
                    <Row>
                      <TextSection>
                        <Text>Gender: </Text>
                        <Text2>{val.gender}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Contact No: </Text>
                        <Text2>{val.contact_no}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Account No: </Text>
                        <Text2>{val.account_no}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Balance: </Text>
                        <Text2>{val.Init_balance}</Text2>
                      </TextSection>
                    </Row>
                    <Row>
                      <TextSection>
                        <Text>Account Type: </Text>
                        <Text2>{val.account_type}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Creation Date: </Text>
                        <Text2>{val.open_date}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Loan Status: </Text>
                        <Text2>{val.loan_status}</Text2>
                      </TextSection>
                      <TextSection>
                        <Text>Bank Name: </Text>
                        <Text2>{val.Bank_name}</Text2>
                      </TextSection>
                    </Row>
                    <Spacer />
                    <Text>Sent Transactions:</Text>
                    <SmallSpacer />
                    {sentTransactions.map((val, key) => {
                      return (
                        <Text2>
                          {val.amount} Rs sent to Account No. "{val.to_acc_no}"
                          on date"{val.tran_date}" | {val.tran_type}(
                          {val.tran_method})
                        </Text2>
                      );
                    })}
                    <Spacer />
                    <Text>Transactions Recieved:</Text>
                    <SmallSpacer />
                    {recievedTransactions.map((val, key) => {
                      return (
                        <Text2>
                          {val.amount} Rs recieved on date "{val.tran_date}" |{" "}
                          {val.tran_type}({val.tran_method})
                        </Text2>
                      );
                    })}
                    <Spacer />
                    <Text>Registered Complaints:</Text>
                    <SmallSpacer />
                    {sentComplain.map((val, key) => {
                      return (
                        <Text2>
                          "{val.complaint}" registered on "{val.complaint_date}"
                        </Text2>
                      );
                    })}
                    <Spacer />
                    <Text>Payment Requests Sent:</Text>
                    <SmallSpacer />
                    {sentPaymentRequests.map((val, key) => {
                      return (
                        <Text2>
                          Payment requests sent to Account No: "{val.account_no}
                          " with Message: "{val.message}"
                        </Text2>
                      );
                    })}
                    <Spacer />
                    <Text>Payment Requests Recieved:</Text>
                    <SmallSpacer />
                    {recievedPaymentRequests.map((val, key) => {
                      return (
                        <Text2>
                          Requested by User with Id: "{val.user_id}" with
                          Message: "{val.message}"
                        </Text2>
                      );
                    })}
                    <Spacer />
                  </Divi>
                );
              })}
            </Accounts>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default CutomerDetails;
