import expressAsyncHandler from "express-async-handler";
import HTTP_Error from "../utils/httpError.js";
import { NOT_FOUND, OK } from "../constants/http.codes.js";

export const deleteOneDoc = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const removedDocument = await Model.findByIdAndDelete(req.params.id);
    if (!removedDocument)
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);

    res.status(OK).json({
      success: true,
      message: `${Model.modelName} deleted successfully`,
    });
  });

export const updateOneDoc = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);
    }

    res.status(OK).json({
      success: true,
      message: `${Model.modelName} updated successfully`,
      data: updatedDoc,
    });
  });

export const fetchOneDoc = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const foundDocument = await Model.findById(req.params.id);

    if (!foundDocument)
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);

    res.status(200).json({
      success: true,
      message: `Retrieved ${Model.modelName}`,
      data: foundDocument,
    });
  });
