import React, { useState } from "react";
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
} from "./SignupElements";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import "./GoogleButton.css";
import "./SignupStyles.css";

const Signup = () => {
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member1Id, setMember1Id] = useState("");
  const [member2Id, setMember2Id] = useState("");
  const [member3Id, setMember3Id] = useState("");
  const [password, setPassword] = useState("");
  const [whereto, setWhereto] = useState("/");
  const [imgSrc, setImgSrc] = useState("");

  const updateProjectTitle = (e) => {
    setProjectTitle(e.target.value);
  };

  const updateMember1 = (e) => {
    setMember1(e.target.value);
  };

  const updateMember2 = (e) => {
    setMember2(e.target.value);
  };

  const updateMember3 = (e) => {
    setMember3(e.target.value);
  };

  const updateMember1Id = (e) => {
    setMember1Id(e.target.value);
  };

  const updateMember2Id = (e) => {
    setMember2Id(e.target.value);
  };

  const updateMember3Id = (e) => {
    setMember3Id(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const addUserAccount = () => {
    Axios.post("http://localhost:3001/sign-up", {
      leaderEmail: leaderEmail,
      leaderName: leaderName,
      leaderId: leaderId,
      projectTitle: projectTitle,
      member1: member1,
      member2: member2,
      member3: member3,
      member1Id: member1Id,
      member2Id: member2Id,
      member3Id: member3Id,
      password: password,
    }).then(() => {
      Axios.get("http://localhost:3001/logged-user").then((result) => {
        console.log(result.data);
        let arr;
        arr = result.data;
        arr.map((val, key) => {
          console.log(val.team_password);
        });
      });
      console.log("success !");
      setWhereto("/signup");
    });
  };

  const responseGoogle = (response) => {
    console.log(response);
    setImgSrc(response.profileObj.imageUrl);
    setLeaderEmail(response.profileObj.email);
    setLeaderName(response.profileObj.familyName);
    setLeaderId(response.profileObj.givenName);
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Projo</Icon>
        <FormContent>
          <Form action="#" onSubmit={addUserAccount}>
            <FormH1>Register your account</FormH1>

            {imgSrc ? (
              <div className="welcome">
                <img className="image" src={imgSrc} alt="movie" />
                <h1 className="text">Welcome! {leaderName}</h1>
              </div>
            ) : (
              <GoogleLogin
                className="google"
                clientId="428967125751-etpht3bss3jotmbohpf6qlg0rkbc9i8h.apps.googleusercontent.com"
                buttonText="Login with Leader's Google Id"
                onSuccess={() => {}}
                onFailure={() => {}}
                cookiePolicy="single_host_origin"
              ></GoogleLogin>
            )}
            <FormLabel htmlFor="for">Project Title</FormLabel>
            <FormInput
              type="text"
              value={projectTitle}
              onChange={updateProjectTitle}
            />
            <FormLabel htmlFor="for">Member 1</FormLabel>
            <FormInput type="text" value={member1} onChange={updateMember1} />
            <FormLabel htmlFor="for">Member 1 Id</FormLabel>
            <FormInput
              type="text"
              value={member1Id}
              onChange={updateMember1Id}
            />
            <FormLabel htmlFor="for">Member 2</FormLabel>
            <FormInput type="text" value={member2} onChange={updateMember2} />
            <FormLabel htmlFor="for">Member 2 Id</FormLabel>
            <FormInput
              type="text"
              value={member2Id}
              onChange={updateMember2Id}
            />
            <FormLabel htmlFor="for">Member 3</FormLabel>
            <FormInput type="text" value={member3} onChange={updateMember3} />
            <FormLabel htmlFor="for">Member 3 Id</FormLabel>
            <FormInput
              type="text"
              value={member3Id}
              onChange={updateMember3Id}
            />
            <FormLabel htmlFor="for">Team Password</FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={updatePassword}
            />
            <FormButton to={whereto} onClick={addUserAccount}>
              Create Account
            </FormButton>
            <Text>Hint: Think of all the people you hang around with!</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default Signup;
