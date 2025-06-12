import express from "express";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

// app.use(cookieParser());
app.use(cookieParser("mysecretkey123"));

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.get("/setCookie", (req, res) => {
  res.cookie("username", "waseem akram", {
    maxAge: 900000,
    httpOnly: true,
    signed: true,
  });
  res.send("cookie has set");
});

app.get("/getCookie", (req, res) => {
  const username = req.signedCookies.username;
  if (!username) {
    res.send("no cookie found");
  }
  res.send(`cookie has found ${username}`);
});

app.get("/deletecookie", (req, res) => {
  res.clearCookie("username");
  res.send("cookie has been deleted");
});
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
