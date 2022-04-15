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
} from "./ProjectUpdate";
import Axios from "axios";
import emailjs from "emailjs-com";
import "./ProjectUpdate.css";
import axios from "axios";

const ProjectUpdate = () => {
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");

  const updateSummary = (e) => {
    setSummary(e.target.value);
  };

  const updateFile = (e) => {
    encodeFileBase64(e.target.files[0]);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = () => {
        let Base64 = reader.result;
        console.log(Base64);
        setFile(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  //   function sendEmail() {
  //     let data = {
  //       to_email: toEmail,
  //       email: email,
  //       message: message,
  //       user_id: userId,
  //       to_name: toName,
  //       name: name,
  //       accountNo: accountNo,
  //     };
  //     emailjs
  //       .send(
  //         "service_r9655qf",
  //         "template_j1wrtru",
  //         data,
  //         "user_XbYd9CbERMB6qt2SkaPpk"
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  const projectUpdate = () => {
    console.log(file);
    Axios.put("http://localhost:3001/project-update", {
      summary: summary,
      file: file,
    }).then((result) => {
      console.log(result.status);
    });
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Post Project Report Update</FormH1>
            <FormLabel htmlFor="for">Report Summary</FormLabel>
            <FormInput
              type="text"
              required
              value={summary}
              onChange={(e: string) => updateSummary(e)}
            />
            <FormLabel htmlFor="for">PDF file Report</FormLabel>

            <input
              className="inputfile"
              type="file"
              name="file"
              id="file"
              onChange={updateFile}
              required
            />
            <FormButton to="/services" onClick={projectUpdate}>
              Submit Application
            </FormButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default ProjectUpdate;
