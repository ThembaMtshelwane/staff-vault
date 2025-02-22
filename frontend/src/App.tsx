import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './layouts/AdminLayout'
import Profile from './pages/admin/Profile'
import Departments from './pages/admin/Departments/Departments'
import Employees from './pages/admin/Employees/Employees'
import Settings from './pages/admin/Settings'
import AddEmployee from './pages/admin/Employees/AddEmployee'
import Employee from './pages/admin/Employees/Employee'
import AddDepartment from './pages/admin/Departments/AddDepartment'
import Department from './pages/admin/Departments/Department'
import PrivateRoutes from './components/PrivateRoutes'
import Dashboard from './pages/users/Dashboard'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoutes role={'admin'} />}>
        <Route path="/admin" element={<AdminLayout />}>
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
            <Route index element={<Departments />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="" element={<PrivateRoutes role={'general'} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
