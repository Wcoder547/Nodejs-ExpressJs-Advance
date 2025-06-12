import express from "express";
import cookieParser from "cookie-parser";
import csrf from "csurf";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize CSRF protection with cookies
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

//  <input type="hidden" name="_csrf" value="$csrfToken"></input>
//imp

app.get("/form", (req, res) => {
  res.send(`
        <form action="/process" method="POST">
            <input type="hidden" name="_csrf" value="${req.csrfToken()}">
            <input type="text" name="data" />
            <button type="submit">Submit</button>
        </form>
    `);
});
app.post("/process", (req, res) => {
  // If CSRF token is valid, request is processed
  res.send("Data is processed securely!");
});
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
