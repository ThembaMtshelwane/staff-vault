import expressAsyncHandler from "express-async-handler";
import {
  departmentIdSchema,
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
      throw new Error(result.error.message);
    }

    req.query = result.data;
    next();
  }
);

export const validateDepartmentID = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const result = departmentIdSchema.safeParse(id);

    if (!result.success) {
      res.status(400);
      throw new Error(result.error.message);
    }

    req.params.id = result.data;
    next();
  }
);
