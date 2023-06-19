const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const posts = [
  {
    username: "thein",
    title: "Hello",
  },
  {
    username: "naing",
    title: "Hi",
  },
];

app.get("/posts", (rea, res) => {
  res.json(posts);
});

app.post('/login', (req, res)=> {
  //Authenticate User
  const username = req.body.username
  // for payload first argument in jwt.sign , we have to create user object/data.
  const user = {name: username}
  // second argument is ACCESS_SECRET_TOKEN. you can create by following steps.
  // type : node
// then type require('crypto').randomBytes(64).toString('hex')
// you will get 64 digit secret key & copy and paste it in .env.
// then create REFREH_TOKEN_SECRET in .env , create one more
// require('crypto').randomBytes(64).toString('hex') and you will get another secret
// key copy and paste it in  REFREH_TOKEN_SECRET.

  const accessToken = jwt.sign(user, process.env. ACCESS_SECRET_TOKEN)
  res.json({
    accessToken: accessToken
  })
})


//






app.listen(3000);
