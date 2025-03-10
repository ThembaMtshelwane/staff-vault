import expressAsyncHandler from "express-async-handler";
import { departmentsListSchema } from "../../schemas/departmentSchemas.js";

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
