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
} from "./AdminPanelElements";
import Axios from "axios";

const AdminPanel = () => {
  const [projectsInfo, setProjectsInfo] = useState([]);
  const [mem, setMem] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/projects-info").then((result) => {
      setProjectsInfo(result.data);
      console.log(result.data);
    });
    Axios.get("http://localhost:3001/get-members").then((result) => {
      setMem(result.data);
      console.log(result.data);
    });
    Axios.get("http://localhost:3001/get-tasks").then((result) => {
      setTasks(result.data);
      console.log(result.data);
    });
  }, [projectsInfo]);

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Sign Out</Icon>
        <FormContent>
          <Form>
            <FormH1>All Projects</FormH1>
            <Accounts>
              {projectsInfo.map((val, key) => (
                <div
                  key={key}
                  className="h-auto border-2 border-green-400 my-4 px-16 py-4 w-[90%]"
                >
                  <h1 className="text-white text-[24px] font-bold text-center">
                    {val.project_title}
                  </h1>
                  <h2 className="text-white underline my-4 underline-offset-2">
                    Team Members:
                  </h2>
                  {mem.map((val, key) => (
                    <h2 className="text-white">
                      {key + 1}. {val.member_name}
                    </h2>
                  ))}
                  <h2 className="text-white underline my-4 underline-offset-2">
                    Assigned Tasks:
                  </h2>
                  {tasks.map((val, key) => (
                    <h2 className="text-white">
                      {key + 1}. {val.task}
                    </h2>
                  ))}
                </div>
              ))}
            </Accounts>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default AdminPanel;
