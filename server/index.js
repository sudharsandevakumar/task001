const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "task001",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log("error>>>>", err);
  });
});

app.post("/api/insertUser", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const age = req.body.age;
  const city = req.body.city;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const linkedIn = req.body.linkedIn;
  const terms = req.body.terms;
  const userStatus = req.body.userStatus;

  const sqlInsert =
    "INSERT INTO users (firstname, lastname, email, password, age, city, gender, phone, linkedin, terms, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      firstName,
      lastName,
      email,
      password,
      age,
      city,
      gender,
      phone,
      linkedIn,
      terms,
      userStatus,
    ],
    (err, result) => {
      console.log(result);
      console.log("err>>>", err);
    }
  );
});

app.put("/api/updateUser", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const age = req.body.age;
  const city = req.body.city;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const linkedIn = req.body.linkedIn;
  const terms = req.body.terms;
  const cond = req.body.cond;
  db.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, age = ?, city = ?, gender = ?, phone = ?, linkedin = ?, terms = ? WHERE email = ?",
    [
      firstName,
      lastName,
      email,
      password,
      age,
      city,
      gender,
      phone,
      linkedIn,
      terms,
      cond,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateStatus", (req, res) => {
  const id = req.body.id;
  const vStatus = req.body.vStatus;
  db.query(
    "UPDATE users SET status = ? WHERE id = ?",
    [vStatus, id],
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
  console.log("running on port 3001");
});
