import type { Request, Response } from "express";
import type { AdoptionServer } from "@amcoeur/types";
import Adoption from "../models/adoption.js";

export const createAdoption = async (req: Request, res: Response) => {
  try {
    const newAdoption = new Adoption({ ...req.body });
    await newAdoption.save();

    res.status(201).json(newAdoption);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création de la réponse.",
      });
    }
  }
};

export const deleteAdoption = async (req: Request, res: Response) => {
  try {
    const deletedAnswer = await Adoption.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedAnswer) {
      res.status(200).json({ message: "Réponse supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Réponse non trouvée" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création de l'adoption.",
      });
    }
  }
};

export const updateAdoption = async (req: Request, res: Response) => {
  try {
    const updatedAdoptionData = req.body as AdoptionServer;
    const updatedAnswer = await Adoption.findByIdAndUpdate(
      req.params.id,
      updatedAdoptionData,
      {
        new: true,
      },
    );
    if (updatedAnswer) {
      res.status(200).json(updatedAnswer);
    } else {
      res.status(404).json({ message: "Adoption non trouvée" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification de l'adoption.",
      });
    }
  }
};

export const getAdoption = async (req: Request, res: Response) => {
  try {
    const answer = await Adoption.findById(req.params.id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ message: "Adoption introuvable" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération de l'adoption.",
      });
    }
  }
};

export const getAdoptions = async (req: Request, res: Response) => {
  try {
    const answer = await Adoption.find(req.query);
    res.status(200).json(answer);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des adoptions.",
      });
    }
  }
};
