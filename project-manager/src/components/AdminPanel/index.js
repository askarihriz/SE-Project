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
  FormButton,
  EmptyDiv,
  Spacer,
  SmallSpacer,
} from "./AdminPanelElements";
import Axios from "axios";

const AdminPanel = () => {
  const [BankAccounts, setBankAccounts] = useState([]);
  const [string, setString] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/accountholders").then((result) => {
      setBankAccounts(result.data);
    });
  }, [string]);

  function Greeting(props) {
    setString(props.string);
    console.log(props.accNo);
    const accountNo = props.accNo;
    if (props.string === "Applied") {
      return (
        <FormButton
          onClick={() => {
            Axios.post("http://localhost:3001/accountholders2", {
              accountNo: accountNo,
            }).then((result) => {
              const loanAmount = result.data;
              loanAmount.map((val, key) => {
                const LoanAmount = val.loan_amount;
                Axios.put("http://localhost:3001/accountholders3", {
                  accountNo: accountNo,
                  LoanAmount: LoanAmount,
                }).then(() => {
                  console.log("Loan Accepted!");
                  setString(string + 1);
                });
              });
            });
          }}
        >
          Accept Loan Application
        </FormButton>
      );
    } else {
      return <EmptyDiv />;
    }
  }

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Bank Accounts</FormH1>
            <Accounts>
              {BankAccounts.map((val, key) => {
                return (
                  <Divi>
                    <Spacer></Spacer>
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
                    <Spacer></Spacer>
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
                    <Spacer></Spacer>
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
                    <Spacer></Spacer>
                    <Greeting string={val.loan_status} accNo={val.account_no} />
                    <Spacer></Spacer>
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

export default AdminPanel;
