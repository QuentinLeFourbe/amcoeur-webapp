import type { Request, Response } from "express";
import Adoption from "../models/adoption.js";
import {
  getAdoptionFilter,
  convertAdoptionToPublicData,
} from "../utils/adoptions.js";
import { addPagination } from "../utils/db.js";
import { parseBoolean, parseQueryArray } from "../utils/query.js";
import type { AdoptionFilter } from "../types/adoptions.js";
import type {
  AdoptionContact,
  AdoptionServerData,
  AdoptionsListData,
} from "@amcoeur/types";

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
    const updatedAdoptionData = req.body as AdoptionServerData;
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
    const { count, limit, page, gender, species, name } = req.query;
    const parsedLimit = parseInt(limit as string);
    const pageLimit = !parsedLimit || parsedLimit < 1 ? 20 : parsedLimit;
    const parsedPage = parseInt(page as string);
    const pageNumber = !parsedPage || parsedPage < 1 ? 1 : parsedPage;
    const isCounting = parseBoolean(count as string);

    const speciesFilterValue = parseQueryArray(species as string);
    const filter = getAdoptionFilter({
      gender,
      species: speciesFilterValue,
      name,
    } as AdoptionFilter);

    const countRequest = isCounting
      ? {
          speciesCount: [
            {
              $group: {
                _id: "$species", // Grouper par la species
                count: { $sum: 1 }, // Compter le nombre pour chaque species
              },
            },
          ],

          genderCount: [
            {
              $group: {
                _id: "$gender", // Grouper par sexe
                count: { $sum: 1 }, // Compter le nombre pour chaque sexe
              },
            },
          ],
        }
      : {};

    const results = await Adoption.aggregate([
      {
        $match: filter,
      },
      {
        $facet: {
          paginatedAdoptions: addPagination(pageNumber, pageLimit),
          totalAdoptions: [{ $count: "total" }], // Compte le nombre total d'adoptions
          ...countRequest,
        },
      },
    ]);
    const totalAdoptions = results[0]?.totalAdoptions[0]?.total || 0;
    const totalPages = Math.ceil(totalAdoptions / pageLimit);
    const currentPage = pageNumber > totalPages ? totalPages : pageNumber;
    const response = {
      pagination: {
        page: currentPage,
        totalPages,
        perPage: pageLimit,
        totalItems: totalAdoptions,
      },
    } as Omit<AdoptionsListData, "data">;

    if (isCounting) {
      const count = {
        species: results[0].speciesCount,
        gender: results[0].genderCount,
      };
      response.count = count;
    }

    if (res.locals.user) {
      const responseWithData = {
        ...response,
        data: results[0].paginatedAdoptions,
      } as AdoptionsListData;
      return res.status(200).json(responseWithData);
    } else {
      const publicData = (results[0].paginatedAdoptions as []).map((adoption) =>
        convertAdoptionToPublicData(adoption as AdoptionServerData),
      );
      const responseWithData = {
        ...response,
        data: publicData,
      };
      return res.status(200).json(responseWithData);
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
        "Une erreur s'est produite lors de l'enregistrement de la réponse",
    });
  }
};
