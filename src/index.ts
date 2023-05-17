import express, { Request, Response } from "express";
import { Growdev } from "./models/growdever";

const app = express();

app.get("/", (req: Request, res: Response) => {
  console.log("Acessou a rota...");
  const growdev = new Growdev(5, 'Junior', 25);
  res.status(200).send({ success: true, data: growdev.toJson() });
});

app.listen(3333, () => {
  console.log("Api is running port 3333");
});
