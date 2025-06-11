import express from "express";
const app = express();
const port = 3000;

app.use(express.json()); //so we can use json anywhere
app.use(express.urlencoded({ extended: false })); //

app.post("/about", (req, res) => {
  res.send(req.body);
});

app.get("/hello", (req, res) => {
  res.send(req.hostname); //localhost
});

app.get("/ip", (req, res) => {
  res.send(req.ip); //::1
});

app.get("/ips", (req, res) => {
  res.send(req.ips); //[]
});

app.get("/method", (req, res) => {
  res.send(req.method); //GET
});

app.get("/originalUrl", (req, res) => {
  res.send(req.originalUrl); //   /originalUrl
  //    res.send(req.path); //   /originalUrl
});

app.get("/protocol", (req, res) => {
  res.send(req.protocol); //   /http
});

app.get("/secure", (req, res) => {
  res.send(req.secure); //   if  http then false if https then true
});

app.get("/route", (req, res) => {
  res.send(req.route); //give internal information about route
});
// {
//     "path": "/route",
//     "stack": [
//         {
//             "keys": [],
//             "name": "<anonymous>",
//             "slash": false,
//             "matchers": [
//                 null
//             ],
//             "method": "get"
//         }
//     ],
//     "methods": {
//         "get": true
//     }
// }

//from postman we can send data to

//Methods
app.get("/about", (req, res) => {
  if (req.accepts("html")) {
    res.send("<h1>Hello Html</h1>");
  } else if (req.accepts("json")) {
    res.send({ message: "Hello json" });
  } else if (req.accepts("xml")) {
    res.send("<message>Hello XML</message>");
  } else {
    res.send("no content found");
  }
}); //hello html

app.get("/req", (req, res) => {
  //   res.send(req.headers); //request headers
  //   res.send(req.get("Host"));
  //   res.send(req.get("connection")); //keep alive
  res.send(req.get("Accept")); //text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
});

app.get("/new", (req, res) => {
  if (req.is("application/json")) {
    res.send("valid json data");
  } else if (req.is("text/html")) {
    res.send("Html data");
  } else {
    res.status(400).send("unsupported  content-type");
  }
}); //unsupported content-type
//if post and also raw dat/json then it will valid json data , same for html data

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
