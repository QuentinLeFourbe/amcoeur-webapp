import type { PaginatedResult } from "@amcoeur/types";
import { Model, type PipelineStage } from "mongoose";

type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: { [key: string]: 1 | -1 } | undefined;
  filter?: { [key: string]: unknown };
  count?: string[] | undefined;
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
    count = [],
  } = options;
  const skip = (page - 1) * limit;

  const filterPipeline: PipelineStage[] = [
    {
      $match: filter,
    },
  ];

  const countPipeline = count.reduce((countQuery, key) => {
    const query = { ...countQuery } as { [key: string]: unknown };
    query[key] = [
      {
        $group: {
          _id: "$" + key,
          count: { $sum: 1 },
        },
      },
    ];
    return query;
  }, {});

  const countProject = count.reduce((project, key) => {
    const accProject = { ...project } as { [key: string]: unknown };
    accProject[key] = {
      $map: {
        input: "$" + key,
        as: "k",
        in: { key: "$$k._id", value: "$$k.count" },
      },
    };
    return accProject;
  }, {});

  const paginationPipeline = [
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ];

  const results = (await model.aggregate([
    ...filterPipeline,
    {
      $facet: {
        data: paginationPipeline,
        totalItems: [{ $count: "total" }],
        ...countPipeline,
      },
    },
    {
      $project: {
        data: 1,
        totalItems: { $arrayElemAt: ["$totalItems.total", 0] },
        count: countProject,
      },
    },
  ])) as Pick<PaginatedResult<T>, "data" | "totalItems" | "count">[];

  const totalItems = results[0]?.totalItems || 0;
  return {
    perPage: limit,
    page,
    totalPages: Math.ceil(totalItems / limit),
    data: results[0]?.data || [],
    totalItems,
    count: results[0]?.count,
  } as PaginatedResult<T>;
};
