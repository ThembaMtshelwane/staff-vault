import expressAsyncHandler from "express-async-handler";
import HTTP_Error from "../utils/httpError.js";
import { NOT_FOUND } from "../constants/http.codes.js";

export const deleteOneDoc = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const removedDocument = await Model.findByIdAndDelete(req.params.id);
    if (!removedDocument)
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  });
