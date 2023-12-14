import { Request, Response } from "express";
import Page from "../models/page";

export const createPage = async (req: Request, res: Response) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json(newPage);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Une erreur s'est produite" });
    }
  }
};
