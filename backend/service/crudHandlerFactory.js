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

export const fetchDocsByPagination = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const search = req.query.search || "";
    const department = req.query.department;
    const limit = 12;
    const skip = (page - 1) * limit;
    let filter = {};

    if (department) {
      if (!mongoose.Types.ObjectId.isValid(department)) {
        throw new HTTP_Error(`Invalid ${Model.modelName} id`, BAD_REQUEST);
      }
      filter.department = new mongoose.Types.ObjectId(department);
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    const documents = await Model.find(filter).skip(skip).limit(limit);
    const totalDocuments = await Model.countDocuments(filter);

    if (documents.length > 0) {
      res.status(200).json({
        success: true,
        message: `Found ${documents.length} ${Model.modelName}s `,
        data: documents,
        pagination: {
          totalDocuments,
          currentPage: page,
          totalPages: Math.ceil(totalDocuments / limit),
          pageSize: limit,
        },
      });
    } else {
      throw new HTTP_Error(`No ${Model.modelName}s  found`, NOT_FOUND);
    }
  });

export const fetchDocs = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const documents = await Model.find({});

    if (!documents) {
      throw new HTTP_Error("Internal Server error", INTERNAL_SERVER_ERROR);
    }

    if (documents.length > 0) {
      res.status(200).json({
        success: true,
        message: `Found ${documents.length} ${Model.modelName}s`,
        data: documents,
      });
    } else {
      throw new HTTP_Error(`No  ${Model.modelName}s found`, NOT_FOUND);
    }
  });
