import type {
  AdoptionContact,
  AdoptionFilter,
  AdoptionServerData,
  PaginatedResult,
} from "@amcoeur/types";
import type { Request, Response } from "express";

import Adoption from "../models/adoption.js";
import { paginate } from "../services/dbService.js";
import { updateDbUser } from "../services/userService.js";
import {
  convertAdoptionToPublicData,
  getAdoptionFilter,
} from "../utils/adoptions.js";
import { deleteUploadedImage } from "../utils/files.js";
import { parseBoolean, parseQueryArray } from "../utils/query.js";

export const createAdoption = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    let imageUrl = "";
    if (files && files.length && files[0]?.filename) {
      imageUrl = `/api/images/${files?.[0]?.filename}`;
    }

    const newAdoption = new Adoption({
      ...req.body,
      imageUrl,
    } as AdoptionServerData);
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
      if (deletedAnswer.imageUrl) {
        deleteUploadedImage(deletedAnswer.imageUrl);
      }

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
    const updatedAdoptionData = req.body as AdoptionServerData;

    const isAdopted =
      (updatedAdoptionData.adopted as unknown as string) === "true";

    if (isAdopted === true) {
      updatedAdoptionData.visible = false;
    }

    const files = req.files as Express.Multer.File[];
    let imageUrl = updatedAdoptionData.imageUrl || "";
    if (files && files.length && files[0]?.filename) {
      imageUrl = `/api/images/${files?.[0]?.filename}`;
      if (updatedAdoptionData.imageUrl) {
        deleteUploadedImage(updatedAdoptionData.imageUrl);
      }
    }

    console.log({ updatedAdoptionData });

    const updatedAnswer = await Adoption.findByIdAndUpdate(
      req.params.id,
      { ...updatedAdoptionData, imageUrl },
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
    const adoption = await Adoption.findById(req.params.id);
    if (adoption) {
      if (res.locals.user) {
        res.status(200).json(adoption);
      } else {
        res
          .status(200)
          .json(convertAdoptionToPublicData(adoption as AdoptionServerData));
      }
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
    const isPublic = !res.locals.user;
    const { count, gender, species, name, sortBy, order } = req.query;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const adopted =
      req.query.adopted && JSON.parse(req.query.adopted as string);
    const visible =
      req.query.visible && JSON.parse(req.query.visible as string);
    const emergency =
      req.query.emergency && JSON.parse(req.query.emergency as string);

    const pageLimit = !limit || limit < 1 ? 20 : limit;
    const pageNumber = !page || page < 1 ? 1 : page;
    const isCounting = parseBoolean(count as string);
    const orderValue = order === "desc" ? -1 : 1;

    const speciesFilterValue = parseQueryArray(species as string);
    const filter = getAdoptionFilter({
      gender,
      species: speciesFilterValue,
      name,
      adopted,
      visible: isPublic ? true : visible,
      emergency,
    } as AdoptionFilter);

    const defaultSort = { createdAt: -1 } as { createdAt: -1 };

    const results = (await paginate(Adoption, {
      page: pageNumber,
      limit: pageLimit,
      filter,
      count: isCounting ? ["species", "gender"] : undefined,
      sort: sortBy ? { [`${sortBy}`]: orderValue } : defaultSort,
    })) as PaginatedResult<AdoptionServerData>;

    if (res.locals.user) {
      return res.status(200).json(results);
    } else {
      const publicData = results.data.map((adoption) =>
        convertAdoptionToPublicData(adoption as AdoptionServerData),
      );
      const resultsWithPublicData = {
        ...results,
        data: publicData,
      };
      return res.status(200).json(resultsWithPublicData);
    }
  } catch (error) {
    res.locals.logger.error(error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des adoptions.",
      });
    }
  }
};

export const registerAdoptionAnswer = async (req: Request, res: Response) => {
  try {
    const { email, name, phone, firstname, motivation, adoptionId } =
      req.body as AdoptionContact;

    const answer = await Adoption.findByIdAndUpdate(
      adoptionId,
      {
        $push: { responsesList: { name, firstname, email, phone, motivation } },
      },
      { new: true },
    );

    return res.status(200).json(answer);
  } catch (e) {
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'enregistrement de la réponse: ",
      e,
    });
  }
};
