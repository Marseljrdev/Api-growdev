import { growdevers } from "../database/growdevers";
import { Growdever } from "../models/growdever";
import { Request, Response } from "express";


export class GrowdeverController {
    /**
     * create
     */
    public create(req: Request, res: Response) {
        try {
            const { nome, idade } = req.body;
        
            const result = growdevers.find((item) => item.nome === nome);
        
            if (result) {
              return res.status(400).send({
                success: false,
                message: "Name already exists",
              });
            }
        
            if (!nome) {
              return res.status(400).send({
                success: false,
                message: "Name was not providded",
              });
            }
        
            if (!idade) {
              return res.status(400).send({
                success: false,
                message: "Idade was not providded",
              });
            }
        
            const growdever = new Growdever(nome, idade);
            growdevers.push(growdever);
        
            return res.status(201).send({
              success: true,
              message: "Growdever was created",
            });
          } catch (error: any) {
            return res.status(500).send({
              success: false,
              message: error.toString(),
            });
          }
    }
}