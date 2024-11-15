import type { PaginatedResult } from "@amcoeur/types";
import { Model, type PipelineStage } from "mongoose";

type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: { [key: string]: 1 | -1 } | undefined;
  filter?: { [key: string]: unknown };
  count?: string[] | undefined;
  customPipeline?: PipelineStage[];
  dataPipeline?: PipelineStage.FacetPipelineStage[];
  dataProject?: { [key: string]: unknown };
};

/**
 * Paginates a MongoDB query with support for filters, sorting, custom pipelines, and counting.
 *
 * @template T - The type of the documents in the collection.
 * @param {Model<T>} model - The Mongoose model to perform the query on.
 * @param {PaginationOptions} [options={}] - The pagination options.
 * @param {number} [options.page=1] - The current page number.
 * @param {number} [options.limit=10] - The number of documents per page.
 * @param {{ [key: string]: 1 | -1 } | undefined} [options.sort={ createdAt: -1 }] - The sort order for the query.
 * @param {{ [key: string]: unknown }} [options.filter={}] - The filter conditions for the query.
 * @param {string[] | undefined} [options.count] - The fields for which to count distinct values.
 * @param {PipelineStage[]} [options.customPipeline=[]] - Custom aggregation pipeline stages to include before the pagination stage.
 * @param {PipelineStage.FacetPipelineStage[]} [options.dataPipeline=[]] - Additional pipeline stages specific to the `data` facet.
 * @param {{ [key: string]: unknown }} [options.dataProject] - Custom projection for the `data` field.
 * @returns {Promise<PaginatedResult<T>>} - The paginated result including data, total items, and optional count information.
 */
export const paginate = async <T>(
  model: Model<T>,
  options: PaginationOptions = {},
): Promise<PaginatedResult<T>> => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {},
    count,
    customPipeline = [],
    dataProject,
    dataPipeline = [],
  } = options;
  const skip = (page - 1) * limit;

  const filterPipeline: PipelineStage[] = [
    {
      $match: filter,
    },
  ];

  const countPipeline = count?.reduce((countQuery, key) => {
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

  const countProject = count?.reduce((project, key) => {
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
    ...customPipeline,
    {
      $facet: {
        data: [...paginationPipeline, ...dataPipeline],
        totalItems: [{ $count: "total" }],
        ...countPipeline,
      },
    },
    {
      $project: {
        data: dataProject || 1,
        totalItems: { $arrayElemAt: ["$totalItems.total", 0] },
        count: countProject,
      },
    },
  ])) as Pick<PaginatedResult<T>, "data" | "totalItems" | "count">[];

  console.log({ data: results[0]?.data });

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
