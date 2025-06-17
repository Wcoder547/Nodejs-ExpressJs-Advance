import express from "express";
import path from "path";

const app = express();
const port = 3000;

//Used in ES Modules
// console.log("DirName:-" + import.meta.dirname);
// console.log("FileName:-" + import.meta.url);

app.get("/", (req, res) => {
  // const filepath = "/user/john/docs/report.pdf";
  // console.log("Basename" + path.basename(filepath));
  // console.log("Dirname" + path.dirname(filepath));
  // console.log("Extname" + path.extname(filepath));
  // const parsed = path.parse(filepath);
  // console.log(parsed);
  // //   {
  //   root: '/',
  //   dir: '/user/john/docs',
  //   base: 'report.pdf',
  //   ext: '.pdf',
  //   name: 'report'
  // }
});

//path.resolve
const absolutePath = path.resolve("public", "file.txt");
console.log("Absolute Path: " + absolutePath);
//joined path
const joinedPath = path.join("/user", "john", "docs", "report.pdf");
console.log("Joined Path: " + joinedPath);

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
