import type { Request, Response } from "express";
import Question from "../models/question.js";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = new Question({ ...req.body });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création de la question.",
      });
    }
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deletedQuestion = await Question.findOneAndDelete({ _id: req.params.id });
    if (deletedQuestion) {
      res.status(200).json({ message: "Question supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Question non trouvée" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création de la question.",
      });
    }
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedQuestion) {
      res.status(200).json(updateQuestion);
    } else {
      res.status(404).json({ message: "Question non trouvée" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification de la question.",
      });
    }
  }
};

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: "Question introuvable" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération de la question.",
      });
    }
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const question = await Question.find(req.query);
    res.status(200).json(question);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des questions.",
      });
    }
  }
};
