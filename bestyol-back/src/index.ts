import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");

dotenv.config();

const app: Express = express();
// to be changed for production
app.use(cors());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Express + typescript server");
});

app.listen(port, () => {
  console.log(`🚀 http://localhost:${port}`);
});
