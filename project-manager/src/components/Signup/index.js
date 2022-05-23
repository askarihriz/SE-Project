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
} from "./SignupElements";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import "./GoogleButton.css";
import "./SignupStyles.css";
import source from "../../images/addButton.png";

const Signup = () => {
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [memberCount, setMemberCount] = useState([1]);
  const [memberList, setMemberList] = useState([""]);
  const [password, setPassword] = useState("");
  const [whereto, setWhereto] = useState("/");
  const [imgSrc, setImgSrc] = useState("");

  const updateProjectTitle = (e) => {
    setProjectTitle(e.target.value);
  };

  const updateMemberList = (e, key) => {
    memberList[key] = e.target.value;
  };

  const updateMemberCount = () => {
    const newMem = [1, ...memberCount];
    setMemberCount(newMem);
    memberList.push("");
    console.log(memberList);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const addUserAccount = () => {
    for (let i = 0; i < memberList.length; i++) {
      Axios.post("http://localhost:3001/add-member", {
        projectTitle: projectTitle,
        memberName: memberList[i],
      });
    }
    Axios.post("http://localhost:3001/sign-up", {
      leaderEmail: leaderEmail,
      leaderName: leaderName,
      leaderId: leaderId,
      projectTitle: projectTitle,
      password: password,
    }).then(() => {
      Axios.get("http://localhost:3001/logged-user").then((result) => {
        console.log(result.data);
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

  const addMembers = () => {
    return memberCount.map((val, key) => (
      <div className="flex flex-col">
        <FormLabel key={key} htmlFor="for">
          Member
        </FormLabel>
        <FormInput type="text" onChange={(e) => updateMemberList(e, key)} />
      </div>
    ));
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
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              ></GoogleLogin>
            )}
            <FormLabel htmlFor="for">Project Title</FormLabel>
            <FormInput
              type="text"
              value={projectTitle}
              onChange={updateProjectTitle}
            />
            {addMembers()}
            <img
              className="w-14 my-2 bg-black rounded-full mx-auto cursor-pointer"
              src={source}
              alt="Add Button"
              onClick={updateMemberCount}
            ></img>

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
