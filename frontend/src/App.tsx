import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Profile from "./pages/admin/Profile";
import Departments from "./pages/admin/Departments/Departments";
import Employees from "./pages/admin/Employees/Employees";
import Settings from "./pages/admin/Settings";
import AddEmployee from "./pages/admin/Employees/AddEmployee";
import Employee from "./pages/admin/Employees/Employee";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees">
          <Route index element={<Employees />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path=":id" element={<Employee />} />
        </Route>
        <Route path="departments" element={<Departments />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
