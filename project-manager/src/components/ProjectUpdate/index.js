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
  const [email, setEmail] = useState("askarihriz@gmail.com");
  const [toEmail, setToEmail] = useState("askari.hassan888@gmail.com");
  const [proj, setProj] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/project-title").then((result) => {
      setProj(result.data);
      console.log(result.data);
    });
  }, [proj]);

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

  function sendEmail() {
    let x;
    proj.map((val, key) => {
      x = val.project_title;
    });
    let data = {
      to_email: toEmail,
      email: email,
      name: x,
      file: file,
      summary: summary,
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

  const projectUpdate = () => {
    Axios.put("http://localhost:3001/project-update", {
      summary: summary,
      file: file,
    }).then((result) => {
      console.log(result.status);
      sendEmail();
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
              onChange={(e) => updateSummary(e)}
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
