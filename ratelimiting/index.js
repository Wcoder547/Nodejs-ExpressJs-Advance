import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many request from this IP,please try again later.",
});

app.use(limiter);
app.use(helmet());

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
