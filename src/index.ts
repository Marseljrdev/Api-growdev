import express, { Request, Response } from "express";
import { growdevers } from "./database/growdevers";
import { Growdever } from "./models/growdever";
import { GrowdeverController } from "./controllers/growdevers.controller";

const app = express();
app.use(express.json());

//listar growdevers
// GET http://localhost:3333/growdevers

app.get("/growdevers", (req: Request, res: Response) => {
  try {
    const { idade } = req.query;

    let result = growdevers;

    if (idade) {
      result = growdevers.filter((item) => item.idade === Number(idade));
    }

    return res.status(200).send({
      success: true,
      message: "Growdevers were succsess",
      data: result.map((item) => item.toJson()),
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.toString(),
    });
  }
});

//obter ID dos growdevers
// GET http://localhost:3333/growdevers
app.get("/growdevers/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = growdevers.find((item) => item.id === id);

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Pagina not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Growdevers were id succsess",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.toString(),
    });
  }
});

//criar growdevers
// POST http://localhost:3333/growdevers
app.post("/growdevers", (req: Request, res: Response) => {
  return new GrowdeverController().create(req, res);
});

//ou

/* 
app.post("/growdevers", (req, res) =>
  new GrowdeverController().create(req, res)
);
 */

//ou

/* 
app.post("/growdevers", new GrowdeverController().create);
 */

app.listen(3333, () => {
  console.log("Api is running port 3333");
});
