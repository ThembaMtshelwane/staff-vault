import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate, Outlet } from 'react-router'

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}
export default PrivateRoutes
