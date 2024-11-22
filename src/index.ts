import express, { Request, Response } from "express";
import mongoConnect from "./config/mongo";
import session from "express-session";
import cookie_parser from "cookie-parser";

import userAPi from "./routes/user";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port: number = 4000;
app.use(express.json());

// connection mongodb
mongoConnect();
// cookies

app.use(cookie_parser());
// sessions
app.use(
  session({
    secret: "1233abcdef",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60 * 60 * 1, httpOnly: true },
  })
);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("done");
});
// api
app.use("/", userAPi);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
