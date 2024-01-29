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

export const getPagesById = async (req: Request, res: Response) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      res.status(404).json({ message: "Page non trouvée." });
    } else {
      res.status(200).json(page);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération de la page.",
    });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPage) {
      res.status(404).json({ message: "Page non trouvée." });
    } else {
      res.status(200).json(updatedPage);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification de la page.",
      });
    }
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    if (!deletedPage) {
      res.status(404).json({ message: "Page non trouvée." });
    } else {
      res.status(200).json({ message: "Page supprimée avec succès." });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la suppression de la page.",
      });
    }
  }
};

export const getOrCreateHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await Page.findOne({ route: "" });
    if (!homePage) {
      const newHomePage = new Page({
        name: "Accueil",
        route: "",
        components: [],
      });
      await newHomePage.save();
      res.status(201).json(newHomePage);
    } else {
      res.status(200).json(homePage);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de la page d'accueil.",
    });
  }
};
