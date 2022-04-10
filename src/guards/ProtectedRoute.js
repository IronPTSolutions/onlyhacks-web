import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const { user, authenticationChecked } = useAuthContext()
  let location = useLocation()


  if (authenticationChecked && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute