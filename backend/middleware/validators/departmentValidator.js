import expressAsyncHandler from "express-async-handler";
import {
  departmentQuerySchema,
  departmentsListSchema,
} from "../../schemas/departmentSchemas.js";

export const validateCreateAllDepartments = expressAsyncHandler(
  async (req, res, next) => {
    const { departmentsList } = req.body;
    const result = departmentsListSchema.safeParse(departmentsList);

    if (!result.success) {
      res.status(400);
      throw new Error(result.error.message);
    }

    req.body.departmentsList = result.data;
    next();
  }
);

export const validateFetchAllDepartments = expressAsyncHandler(
  async (req, res, next) => {
    const { page, search } = req.query;

    const result = departmentQuerySchema.safeParse({ page, search });

    if (!result.success) {
      res.status(400);
      throw new Error("Invalid search querries");
    }

    req.query = result.data;
    next();
  }
);
