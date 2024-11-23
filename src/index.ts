import express, { Request, Response } from "express";
import mongoConnect from "./config/mongo";

import cookie_parser from "cookie-parser";
import { userAPi, adminApi } from "./routes/index";

const app = express();
const port: number = 4000;
app.use(express.json());

// connection mongodb
mongoConnect();
// cookies

app.use(cookie_parser());
// sessions

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("done");
});
// api user api
app.use("/user", userAPi);
// admin/admin
app.use("/admin", adminApi);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
