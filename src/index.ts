import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import "dotenv/config";

import "./estates/controler";

import { client, connect, seed } from "./utils/pb";
import { routerInstance } from "./utils/router";

const init = async () => {
  await connect();
  console.log("Connected to Postgres");

  await seed();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (
      err instanceof SyntaxError &&
      (err.message.includes("JSON") || err.message.includes("syntax"))
    ) {
      res.status(400).json({ error: "Bad Request - Invalid JSON" });
    } else {
      next();
    }
  });

  app.use(express.static("client/dist"));

  app.use("/api", routerInstance);

  app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
  });
};
init();
