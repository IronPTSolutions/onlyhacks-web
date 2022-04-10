import { useAuthContext } from "../../contexts/AuthContext"

const Profile = () => {
  const { user } = useAuthContext()

  return (
    <div className="Profile">
      <h1 className="mt-3">Profile</h1>

      <p>{JSON.stringify(user)}</p>
    </div>
  )
}

export default Profile