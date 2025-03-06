import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/admin/Profile";
import Departments from "./pages/admin/Departments/Departments";
import Employees from "./pages/admin/Employees/Employees";
import Settings from "./pages/admin/Settings";
import AddEmployee from "./pages/admin/Employees/AddEmployee";
import Employee from "./pages/admin/Employees/Employee";
import AddDepartment from "./pages/admin/Departments/AddDepartment";
import Department from "./pages/admin/Departments/Department";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/users/Dashboard";
import Files from "./pages/users/Files/Files";
import UDepartment from "./pages/users/UDepartment";
import UProfile from "./pages/users/UProfile";
import UpdateFile from "./pages/users/Files/UpdateFile";
import EditDepartment from "./pages/admin/Departments/EditDepartment";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<MainLayout />}>
        {/* Admin Private Routes */}
        <Route element={<PrivateRoutes role={"admin"} />}>
          <Route path="admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees">
              <Route index element={<Employees />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route path=":id" element={<Employee />} />
            </Route>
            <Route path="departments">
              <Route index element={<Departments />} />
              <Route path="add-department" element={<AddDepartment />} />
              <Route path=":id" element={<Department />} />
              <Route path="edit/:id" element={<EditDepartment />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* General User Private Routes */}
        <Route element={<PrivateRoutes role={"general"} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="files">
            <Route index element={<Files />} />
            <Route
              path="certified-id"
              element={<UpdateFile type="Certified ID copy" />}
            />
            <Route path="cv" element={<UpdateFile type="CV" />} />
            <Route
              path="qualifications"
              element={<UpdateFile type="Qualifications" />}
            />
            <Route path="others" element={<UpdateFile type="Other" />} />
          </Route>
          <Route path="department" element={<UDepartment />} />
          <Route path="Profile" element={<UProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
