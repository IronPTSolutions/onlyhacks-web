import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext"

const Profile = () => {
  const { user } = useAuthContext()
  console.log(user);
  return (
    <div className="Profile">
      {user && JSON.stringify(user)}
      <Link to="/favourites">Favourites</Link>
    </div>
  )
}

export default Profile