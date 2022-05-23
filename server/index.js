const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "projectmanager",
});

app.post("/sign-up", (req, res) => {
  const leaderEmail = req.body.leaderEmail;
  const projectTitle = req.body.projectTitle;
  const leaderName = req.body.leaderName;
  const password = req.body.password;

  db.query(
    "Insert into team_info (leader_email, project_title,leader_name,team_password) values (?,?,?,?)",
    [leaderEmail, projectTitle, leaderName, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        db.query(
          "Insert into report_update (leader_email, project_title) values (?,?)",
          [leaderEmail, projectTitle],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
            }
          }
        );
      }
    }
  );
});

app.post("/add-member", (req, res) => {
  const projectTitle = req.body.projectTitle;
  const memberName = req.body.memberName;

  db.query(
    "Insert into project_members (project_title, member_name) values (?,?)",
    [projectTitle, memberName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add-tasks", (req, res) => {
  const leaderEmail = req.body.leaderEmail;
  const projectTitle = req.body.projectTitle;
  const task = req.body.task;

  db.query(
    "Insert into task_table (leader_email, project_title, task) values (?,?,?)",
    [leaderEmail, projectTitle, task],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/logged-user", (req, res) => {
  db.query(`Select team_password from team_info`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

let MyEmail = "";
let MyPassword = "";
app.post("/signed-in-user", (req, res) => {
  MyEmail = req.body.email;
  MyPassword = req.body.password;
  db.query(
    `Select * from team_info where leader_email='${MyEmail}' and team_password='${MyPassword}'`,
    [MyEmail, MyPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/project-title", (req, res) => {
  db.query(
    `Select project_title, leader_email from team_info where leader_email='${MyEmail}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/tasks", (req, res) => {
  db.query(
    `Select task from task_table where leader_email='${MyEmail}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/project-update", (req, res) => {
  const summary = req.body.summary;
  const file = req.body.file;
  db.query(
    `Update report_update set summary='${summary}', file='${file}' where leader_email='${MyEmail}'`,
    [summary, file, MyEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yay, server is running on 3001");
});

// app.post("/sign-up",(req, res)=> {
//     const email = req.body.email;
//     const password = req.body.password;
//     const fName = req.body.fName;
//     const lName = req.body.lName;
//     const age = req.body.age;
//     const country = req.body.country;
//     const gender = req.body.gender;
//     const contactNo = req.body.contactNo;
//     const accountNo = req.body.accountNo;
//     const initialBalance = req.body.initialBalance;
//     const userName = req.body.userName;
//     const accType = req.body.accType;
//     const openDate = req.body.openDate;
//     const loanStatus = req.body.loanStatus;
//     const bankName = req.body.bankName;

//     db.query("Insert into accountholder (first_name, last_name, age, country, email, gender, contact_no, account_no, Init_balance, account_type, open_date, loan_status, username, password, Bank_name ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[fName, lName, age, country, email, gender, contactNo, accountNo, initialBalance, accType, openDate, loanStatus, userName, password, bankName], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted!");
//         }
//     })
// })

// app.post("/transactions",(req, res)=> {
//     const userId = req.body.userId;
//     const transactionType = req.body.transactionType;
//     const transactionMethod = req.body.transactionMethod;
//     const date = req.body.date;
//     const toName = req.body.toName;
//     const amount = req.body.amount;
//     const toAccountNo = req.body.toAccountNo;

//     db.query("Insert into transactions (user_id, tran_type, tran_method, tran_date, to_name, to_acc_no, amount) values (?,?,?,?,?,?,?)",[userId, transactionType, transactionMethod, date, toName, toAccountNo, amount], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted!");
//         }
//     })
// })

// app.post("/loan",(req, res)=> {
//     const email = req.body.email;
//     const loanType = req.body.loanType;
//     const name = req.body.name;
//     const loanAmount = req.body.loanAmount;
//     const duration = req.body.duration;
//     const address = req.body.address;
//     const profession = req.body.profession;
//     const income = req.body.income;
//     const accountNo = req.body.accountNo;
//     const contactNo = req.body.contactNo;
//     const date = req.body.date;

//     db.query("Insert into loan (loan_type, loan_amount, duration, name, address, profession, income, contact_no, email, Request_Date, account_no) values (?,?,?,?,?,?,?,?,?,?,?)",[loanType, loanAmount, duration, name, address, profession, income, contactNo, email, date, accountNo], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted!");
//         }
//     })
// })

// app.post("/complain",(req, res)=> {
//     const subject = req.body.subject;
//     const complain = req.body.complain;
//     const userId = req.body.userId;
//     const date = req.body.date;

//     db.query("Insert into complaints (subject, complaint, complaint_date, user_id) values (?,?,?,?)",[subject, complain, date, userId], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted!");
//         }
//     })
// })

// app.post("/payment-request",(req, res)=> {
//     const userId = req.body.userId;
//     const toName = req.body.toName;
//     const toAccountNo = req.body.toAccountNo;
//     const message = req.body.message;
//     const email = req.body.email;

//     db.query("Insert into requestpayment (user_id, to_name, to_acc_no, message, email) values (?,?,?,?,?)",[userId, toName, toAccountNo, message, email], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted!");
//         }
//     })
// })

// app.post("/accountholders2", (req, res) => {
//     const accountNo = req.body.accountNo;
//     db.query(`Select loan_amount from loan where account_no=${accountNo}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.put("/accountholders3", (req, res) => {
//     const accountNo = req.body.accountNo;
//     const LoanAmount = req.body.LoanAmount;
//     db.query(`Update accountholder set loan_status='Availed', Init_balance=(Init_balance + ${LoanAmount}) where account_no=${accountNo}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.put("/accountholders", (req, res) => {
//     const accountNo = req.body.accountNo;
//     db.query(`Update accountholder set loan_status='Applied' where account_no=${accountNo}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.get("/accountholders", (req, res) => {
//     db.query("Select * from accountholder", (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.get("/accountholders-complaints", (req, res) => {
//     db.query("Select * from accountholder, complaints where accountholder.user_id=complaints.user_id", (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.put("/update-reciever-salary", (req, res) => {
//     const toAccountNo = req.body.toAccountNo;
//     const amount = req.body.amount;
//     db.query(`update accountholder set Init_balance=Init_Balance+${amount} where account_no='${toAccountNo}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.post("/logged-user-sent-transactions", (req, res) => {
//     const userId = req.body.userId;
//     db.query(`select * from transactions where user_id=${userId}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

// app.post("/logged-user-recieved-transactions", (req, res) => {
//     const accountNo = req.body.accountNo;
//     db.query(`select * from transactions where to_acc_no='${accountNo}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

// app.post("/logged-user-sent-complains", (req, res) => {
//     const userId = req.body.userId;
//     db.query(`select * from complaints where user_id=${userId}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

// app.post("/logged-user-sent-paymentrequests", (req, res) => {
//     const userId = req.body.userId;
//     db.query(`select * from requestpayment where user_id=${userId}`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

// app.post("/logged-user-recieved-paymentrequests", (req, res) => {
//     const accountNo = req.body.accountNo;
//     db.query(`select * from requestpayment where to_acc_no='${accountNo}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

// app.put("/update-sender-salary", (req, res) => {
//     const senderAccNo = req.body.senderAccNo;
//     const amount = req.body.amount;
//     db.query(`update accountholder set Init_balance=Init_Balance-${amount} where account_no='${senderAccNo}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.post("/search-user", (req, res) => {
//     const toAccountNo = req.body.toAccountNo;
//     db.query(`Select * from accountholder where account_no='${toAccountNo}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// let MyEmail="";
// let MyPassword="";
// app.post("/signed-in-user", (req, res) => {
//     MyEmail = req.body.email;
//     MyPassword = req.body.password;
//     db.query(`Select * from accountholder where email='${MyEmail}' and password='${MyPassword}'`,[MyEmail, MyPassword], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.get("/logged-user", (req, res) => {
//     db.query(`Select * from accountholder where email='${MyEmail}' and password='${MyPassword}'`,[MyEmail, MyPassword], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })
