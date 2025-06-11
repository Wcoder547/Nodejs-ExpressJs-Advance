import express from "express";
const app = express();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Welcome Here");
});

app.get("/ok", (req, res) => {
  res.send(["waseem", "Fahad", "Talha"]);
});

// app.get("/user", (req, res) => {
//   const users = [
//     {
//       id: 1,
//       name: "waseem akram",
//     },
//     {
//       id: 2,
//       name: "hafiz fahad iqbal",
//     },
//   ];
//   res.json(users);
// });

app.get("/user", (req, res) => {
  res.jsonp({ id: 1, name: "waseem akram" });
});
//{{baseURL}}/user?callback=myfunction
///**/ typeof myfunction === 'function' && myfunction({"id":1,"name":"waseem akram"});

app.get("/req", (req, res) => {
  res.redirect(301, "/about");
  // res.redirect("..");  it will redirect last visit page
});

app.get("/about", (req, res) => {
  res.send("<h1>Hello about</h1>");
});

app.get("/file", (req, res) => {
  res.render("file");
});

app.get("/download", (req, res) => {
  res.download("./waseem.jpg", "Waseem.jpg");
});

app.get("/sendfile", (req, res) => {
  res.sendFile(__dirname + "/waseem.jpg");
});

app.get("/check", (req, res) => {
  console.log(res.headersSent);
  res.send("Hello");
  console.log(res.headersSent);
});
// false
// true

app.get("/another-chk", (req, res) => {
  res.set("custom", "hello124");
  console.log(res.get("custom")); //hello-124
});
app.listen(port, () => {
  console.log(`App is listening on Port:${port}`);
});
