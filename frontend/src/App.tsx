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
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* General User Private Routes */}
        <Route element={<PrivateRoutes role={"general"} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
