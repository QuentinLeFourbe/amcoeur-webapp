import { Request, Response } from "express";
import Page from "../models/page";
import { matchComponentsWithImageUrl } from "../libs/components";
import { deleteOldImages, deleteUploadedImage } from "../libs/files";
import { PageComponent } from "@amcoeur/types";

export const createPage = async (req: Request, res: Response) => {
  try {
    const components = matchComponentsWithImageUrl(
      req.body.components,
      req.files as Express.Multer.File[],
    );
    const newPage = new Page({ ...req.body, components: components });
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
    const components = matchComponentsWithImageUrl(
      req.body.components,
      req.files as Express.Multer.File[],
    );
    const oldPage = await Page.findById(req.params.id);
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      { ...req.body, components: components },
      {
        new: true,
      },
    );
    deleteOldImages(oldPage, updatedPage);

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
    const deletedPage = await Page.findOneAndDelete({ _id: req.params.id });
    deletedPage?.components.forEach((component: PageComponent) => {
      if ("imageUrl" in component) {
        deleteUploadedImage(component.imageUrl);
      }
    });
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

export const createHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await Page.findOne({ route: "accueil" });
    if (!homePage) {
      const newHomePage = new Page({
        name: "Accueil",
        route: "accueil",
        components: [],
      });
      console.log("We got a new homepage", newHomePage);
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

export const getHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await Page.findOne({ route: "accueil" });
    if (!homePage) {
      res.status(404).json({ message: "Page d'accueil non trouvée." });
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
