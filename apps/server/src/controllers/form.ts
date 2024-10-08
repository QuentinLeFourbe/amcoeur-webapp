import type { Request, Response } from "express";
import Form from "../models/form.js";
import mongoose from "mongoose";

export const createForm = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const newForm = new Form({ ...formData });
    await newForm.save();
    res.status(201).json("Formulaire créé");
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
        message:
          "Une erreur s'est produite lors de la suppression du formulaire.",
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
      res.status(200).json(updatedForm);
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

export const duplicateForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Formulaire non trouvé" });
    }
    const formAsObject = form.toObject();
    formAsObject._id = new mongoose.Types.ObjectId();
    const duplicatedForm = new Form({ ...formAsObject });
    await duplicatedForm.save();
    return res.status(200).json(duplicatedForm);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({
        message:
          "Une erreur s'est produite lors de la duplication du formulaire.",
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

export const getForms = async (_req: Request, res: Response) => {
  try {
    const forms = await Form.aggregate([
      {
        $lookup: {
          from: "formanswers",
          localField: "_id",
          foreignField: "formId",
          as: "answers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          answerCount: { $size: "$answers" },
        },
      },
    ]);

    res.status(200).json(forms);
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
