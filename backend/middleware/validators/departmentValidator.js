import expressAsyncHandler from "express-async-handler";
import {
  addDepartmentSchema,
  departmentIdSchema,
  departmentQuerySchema,
  departmentsListSchema,
  updateDepartmentSchema,
} from "../../schemas/departmentSchemas.js";
import { BAD_REQUEST } from "../../constants/http.codes.js";

export const validateCreateAllDepartments = expressAsyncHandler(
  async (req, res, next) => {
    const { departmentsList } = req.body;
    const result = departmentsListSchema.safeParse(departmentsList);

    if (!result.success) {
      res.status(BAD_REQUEST);
      return next(result.error);
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
      return next(result.error);
    }

    req.query = result.data;
    next();
  }
);

export const validateDepartmentID = expressAsyncHandler(
  async (req, res, next) => {
    const result = departmentIdSchema.safeParse(req.params.id);

    if (!result.success) {
      res.status(400);
      return next(result.error);
    }
    req.params.id = result.data;
    next();
  }
);

export const validateUpdateDepartment = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const { name, positions, supervisor } = req.body;

    const result = updateDepartmentSchema.safeParse({
      id,
      name,
      positions,
      supervisor,
    });
    if (!result.success) {
      res.status(400);
      return next(result.error);
    }
    req.params.id = result.data.id;
    req.body.name = result.data.name;
    req.body.positions = result.data.positions;
    req.body.supervisor = result.data.supervisor;

    next();
  }
);

export const validateAddDepartment = expressAsyncHandler(
  async (req, res, next) => {
    const { name, supervisor, positions } = req.body;

    const result = addDepartmentSchema.safeParse({
      name,
      supervisor,
      positions,
    });
    if (!result.success) {
      res.status(400);
      return next(result.error);
    }

    req.body = { name, supervisor, positions };
    next();
  }
);
