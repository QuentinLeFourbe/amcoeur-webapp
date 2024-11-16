import type { Request, Response } from "express";
import FormAnswers from "../models/answer.js";
import type { FormAnswersServer } from "@amcoeur/types";
import Form from "../models/form.js";
import { sendEmail } from "../services/mailService.js";
import { parseSort } from "../utils/query.js";
import { paginate } from "../services/dbService.js";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const newAnswer = new FormAnswers({ ...req.body });
    await newAnswer.save();

    const { formId } = req.body as FormAnswersServer;

    const form = await Form.findById(formId);

    const answerUrl = `${req.protocol}://${req.hostname}/administration/formulaires/reponses/${formId}/${newAnswer._id}`;
    let mailText = `Une nouvelle réponse vient d'être enregistré pour le formulaire "${form?.name}", vous pouvez la consulter à l'adresse suivante: ${answerUrl}\n\nVoici les réponses à ce formulaire:\n`;
    mailText = newAnswer.answers.reduce(
      (accText, answer) =>
        accText.concat(`\n${answer.field}\n${answer.value}\n`),
      mailText,
    );
    const mailOptions = {
      to: process.env.CONTACT_EMAIL,
      subject: `Nouvelle réponse pour le formulaire: ${form?.name}`,
      text: mailText,
    };
    await sendEmail(mailOptions);
    res.status(201).json(newAnswer);
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

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const deletedAnswer = await FormAnswers.findOneAndDelete({
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
        message: "Une erreur s'est produite lors de la création de la réponse.",
      });
    }
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const { note, archived } = req.body as FormAnswersServer;
    const updatedAnswer = await FormAnswers.findByIdAndUpdate(
      req.params.id,
      { note, archived },
      {
        new: true,
      },
    );
    if (updatedAnswer) {
      res.status(200).json(updatedAnswer);
    } else {
      res.status(404).json({ message: "Réponse non trouvée" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification de la réponse.",
      });
    }
  }
};

export const getAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await FormAnswers.findById(req.params.id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ message: "Réponse introuvable" });
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération de la réponse.",
      });
    }
  }
};

export const getAnswers = async (req: Request, res: Response) => {
  try {
    const { limit, page, sort, formId } = req.query;
    const parsedLimit = parseInt(limit as string);
    const pageLimit = !parsedLimit || parsedLimit < 1 ? 20 : parsedLimit;
    const parsedPage = parseInt(page as string);
    const pageNumber = !parsedPage || parsedPage < 1 ? 1 : parsedPage;
    const parsedSort = parseSort(sort as string);

    const results = await paginate(FormAnswers, {
      filter: { formId },
      page: pageNumber,
      sort: parsedSort,
      limit: pageLimit,
    });

    res.status(200).json(results);
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des réponses.",
      });
    }
  }
};
