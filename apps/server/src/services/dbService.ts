import type { PaginatedResult } from "@amcoeur/types";
import { Model, type PipelineStage } from "mongoose";

type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: { [key: string]: 1 | -1 } | undefined;
  filter?: { [key: string]: unknown };
};

type CountResult = {
  [key: string]: number;
};

/*
 * Does a MongoDB call with pagination, filter, sort and count supported
 * */
export const paginate = async <T>(
  model: Model<T>,
  options: PaginationOptions = {},
): Promise<PaginatedResult<T>> => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {},
  } = options;
  const skip = (page - 1) * limit;

  const filterPipeline: PipelineStage[] = [
    {
      $match: filter,
    },
  ];

  const paginationPipeline = [
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ];

  const results = await model.aggregate([
    ...filterPipeline,
    {
      $facet: {
        data: paginationPipeline,
        totalItems: [{ $count: "total" }],
      },
    },
  ]);

  console.log({ results });
  console.log({ data: results[0].data });

  const totalItems = results[0]?.totalItems[0]?.total || 0;
  return {
    perPage: limit,
    page,
    data: results[0].data,
    totalItems: totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};
