import Page from "../models/page.js";
import { matchComponentsWithImageUrl } from "../libs/components.js";
import { deleteOldImages, deleteUploadedImage } from "../libs/files.js";
import type { Request, Response } from "express";
import { type PageComponent } from "@amcoeur/types";

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
    res.locals.logger.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Une erreur s'est produite" });
    }
  }
};

export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find(req.query);
    res.status(200).json(pages);
  } catch (err) {
    res.locals.logger.error(err);
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
    res.locals.logger.error(err);
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
    res.locals.logger.error(err);
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
      if ("imageUrl" in component && component.imageUrl) {
        deleteUploadedImage(component.imageUrl);
      }
    });
    if (!deletedPage) {
      res.status(404).json({ message: "Page non trouvée." });
    } else {
      res.status(200).json({ message: "Page supprimée avec succès." });
    }
  } catch (err) {
    res.locals.logger.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la suppression de la page.",
      });
    }
  }
};

export const createHomePage = async (_req: Request, res: Response) => {
  try {
    const homePage = await Page.findOne({ route: "accueil" });
    if (!homePage) {
      const newHomePage = new Page({
        name: "Accueil",
        route: "accueil",
        components: [],
      });
      await newHomePage.save();
      res.status(201).json(newHomePage);
    } else {
      res.status(200).json(homePage);
    }
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de la page d'accueil.",
    });
  }
};

export const getHomePage = async (_req: Request, res: Response) => {
  try {
    const homePage = await Page.findOne({ route: "accueil" });
    if (!homePage) {
      res.status(404).json({ message: "Page d'accueil non trouvée." });
    } else {
      res.status(200).json(homePage);
    }
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de la page d'accueil.",
    });
  }
};
