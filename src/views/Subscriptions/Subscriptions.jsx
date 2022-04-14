import { useAuthContext } from "../../contexts/AuthContext"
import { useEffect } from "react"

const Subscriptions = () => {
  const { user, getUser } = useAuthContext()

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="Favourites">
      <h1 className="mt-3">Favourites</h1>
      {user.subscriptions.map(sub => {
        return (
          <p>
            {sub.targetUser.email}
          </p>
        )
      })}
    </div>
  )
}

export default Subscriptions