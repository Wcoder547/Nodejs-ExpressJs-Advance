import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about/:aboutId/team/:teamId", (req, res) => {
  res.send(req.params); //req.params.aboutId
});

//  {
//     "aboutId": "12",
//     "teamId": "23"
// }

app.get("/search", (req, res) => {
  res.send(req.query); //req.query.name
});
// {
//     "name": "waseemakram"
// }

app.listen(port, () => {
  console.log(`app is  listening on port ${port}`);
});
