import { Request, Response } from "express";
import Page from "../models/page";

export const createPage = async (req: Request, res: Response) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    console.log(req.body);
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

export const getAllPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des pages.",
    });
  }
};
