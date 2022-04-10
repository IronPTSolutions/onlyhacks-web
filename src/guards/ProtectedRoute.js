import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const { user, isAuthenticationFetched } = useAuthContext()

  if (isAuthenticationFetched && !user) {
    return <Navigate to="/login" />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute