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
  const [tasks, setTasks] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [ptitle, setPTitle] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [updater, setUpdater] = useState(0);

  const updateTextValue = (e) => {
    setTextValue(e.target.value);
  };
  const updateTasks = () => {
    let flag = false;
    tasks.map((val, key) => {
      if (val === textValue) {
        alert("Cannot add same Task twice!");
        flag = true;
      }
    });
    if (textValue === "") {
      alert("Cannot add blank Task!");
      return;
    }
    if (flag) {
      return;
    }
    const newTasks = [textValue, ...tasks];
    setTasks(newTasks);

    Axios.post("http://localhost:3001/add-tasks", {
      leaderEmail: leaderEmail,
      projectTitle: ptitle,
      task: textValue,
    });
  };

  const deleteTask = (task) => {
    Axios.post("http://localhost:3001/remove-tasks", {
      projectTitle: ptitle,
      task: task,
    }).then((result) => {
      setUpdater(updater + 1);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/project-title").then((result) => {
      const proj = result.data;
      proj.map((val, key) => {
        // console.log(val.project_title);
        const x = val.project_title;
        const y = val.leader_email;
        setPTitle(x);
        setLeaderEmail(y);
      });
    });
    Axios.get("http://localhost:3001/tasks").then((result) => {
      const data = result.data;
      console.log(data);
      let arr = [];
      data.map((val, key) => {
        arr = [val.task, ...arr];
      });
      setTasks(arr);
      console.log(arr);
    });
  }, [updater]);

  return (
    <Container>
      <FormWrap>
        <Icon to="/services">Projo</Icon>
        <FormContent>
          <Form>
            <FormH1>Assign a Tasks</FormH1>
            <Accounts className="p-2">
              <div className="flex rounded-lg">
                <input
                  className="w-[700px] px-2"
                  value={textValue}
                  onChange={updateTextValue}
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-white font-bold px-4 py-2 border-l-2 hover:bg-slate-400"
                  onClick={updateTasks}
                >
                  Add Task
                </button>
              </div>
              <div className="my-4"></div>
              <div className="w-[700px]">
                {tasks.map((val, key) => (
                  <div
                    className="flex items-center w-[700px] justify-between my-4"
                    key={key}
                  >
                    <h2 className="text-white">{val}</h2>
                    <button
                      onClick={() => {
                        deleteTask(val);
                      }}
                      className="bg-green-400 rounded-md px-4 py-2 hover:bg-green-300"
                    >
                      Mark complete
                    </button>
                  </div>
                ))}
              </div>
            </Accounts>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default CutomerDetails;
