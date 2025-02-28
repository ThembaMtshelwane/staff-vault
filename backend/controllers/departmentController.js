import asyncHandler from "express-async-handler";
import Department from "../model/departmentModel.js";

/**
 *  @description Create all of the organization's department
 *  @route POST /api/departments
 *  @access PRIVATE
 */
const createAllDepartments = asyncHandler(async (req, res) => {
  const { departmentsList } = req.body;

  if (!departmentsList) throw new Error("Please enter a list of departments");

  const data = await Promise.all(
    departmentsList.map(async (departmentInfo) => {
      const { name, email, positions, supervisor } = departmentInfo;

      if (!name || !positions || !supervisor.email) {
        res.status(400);
        throw new Error("Each department must have both an email and a name");
      }

      let department = await Department.findOne({ name });
      if (!department) {
        department = await Department.create({
          name,
          positions,
          supervisor: {
            name: "",
            email,
            staff: [],
          },
        });
      }
      return department;
    })
  );
  if (data) {
    res.status(201).json({
      success: true,
      message: `Uploaded ${data.length} departments to the database`,
    });
  } else {
    res.status(500);
    throw new Error("Failed to creat all departments");
  }
});

const getDepartments = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const search = req.query.search;
  const limit = 12;
  const skip = (page - 1) * limit;
  let filter = {};

  const totalDepartments = await Department.countDocuments();

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { supervisor: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const departments = await Department.find(filter).skip(skip).limit(limit);

  if (departments.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${departments.length} departments`,
      data: departments,
      pagination: {
        totalDepartments,
        currentPage: page,
        totalPages: Math.ceil(totalDepartments / limit),
        pageSize: limit,
      },
    });
  } else {
    res.status(500);
    throw new Error("Departments not found");
  }
});

const getDepartmentsFilter = asyncHandler(async (req, res) => {
  const departments = await Department.find({});

  // console.log("departments ", departments);

  if (departments.length > 0) {
    res.status(200).json({
      success: true,
      message: `Fetched all ${departments.length} departments`,
      data: departments,
    });
  } else {
    res.status(500);
    throw new Error("Departments not found");
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Invalid id");
  }

  const department = await Department.findById(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `Found department ${department.name}`,
      data: department,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const department = await Department.findById(id);
  const { name, email, staff } = req.body;

  if (department) {
    department.name = name || department.name;
    department.email = email || department.email;
    department.staff = staff || department.staff;

    const updatedDepartment = await department.save();
    res.status(200).json({
      success: true,
      message: `Department ${department.name} updated`,
      data: updatedDepartment,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const department = await Department.findByIdAndDelete(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `${department.name} Department deleted`,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const addDepartment = asyncHandler(async (req, res) => {
  const { name, email, staff, supervisor } = req.body;

  if (!name || !email || !supervisor) {
    res.status(400);
    throw new Error("Department must have both an email and a name");
  }

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    res.status(400);
    throw new Error("Department already exists");
  }

  const department = await Department.create({
    name,
    email,
    staff,
    supervisor,
  });
  if (department) {
    res.status(201).json({
      success: true,
      message: `${name} Department created successfully`,
    });
  } else {
    res.status(400);
    throw new Error("Department not created");
  }
});

export {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  addDepartment,
  getDepartmentsFilter,
};
