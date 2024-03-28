import type { Request, Response } from "express";
import Form from "../models/form.js";

export const createForm = async (req: Request, res: Response) => {
  try {
    const newForm = new Form({ ...req.body });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du formulaire.",
      });
    }
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const deletedForm = await Form.findOneAndDelete({ _id: req.params.id });
    if (deletedForm) {
      res.status(200).json({ message: "Formulaire supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Formulaire non trouvé" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du formulaire.",
      });
    }
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedForm) {
      res.status(200).json(updateForm);
    } else {
      res.status(404).json({ message: "Formulaire non trouvé" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification du formulaire.",
      });
    }
  }
};

export const getForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: "Formulaire introuvable" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération du formulaire.",
      });
    }
  }
};

export const getForms = async (req: Request, res: Response) => {
  try {
    const form = await Form.find(req.query);
    res.status(200).json(form);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des formulaires.",
      });
    }
  }
};
