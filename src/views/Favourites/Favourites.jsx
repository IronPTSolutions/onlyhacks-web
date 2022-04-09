import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Favourites = () => {
  const { user } = useAuthContext()
  console.log(user);
  return (
    <div className="Favourites">
      {user && JSON.stringify(user)}
      <Link to="/profile">Favourites</Link>
    </div>
  )
}

export default Favourites