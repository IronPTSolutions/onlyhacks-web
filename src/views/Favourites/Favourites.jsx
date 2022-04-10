import { useAuthContext } from "../../contexts/AuthContext"

const Favourites = () => {
  const { user } = useAuthContext()

  return (
    <div className="Favourites">
      <h1 className="mt-3">Favourites</h1>

      <p>{JSON.stringify(user)}</p>
    </div>
  )
}

export default Favourites