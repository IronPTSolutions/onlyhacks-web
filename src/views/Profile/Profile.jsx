import { useAuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom";
import { deletePost } from "../../services/PostService";

const Profile = () => {
  const { user, getUser } = useAuthContext()
  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        getUser()
      })
  }
  return (
    <div className="Profile">
      <h1 className="mt-3">Profile</h1>
      <h3>
        My posts
        <Link to="/post/new" className="btn btn-light border ms-3">
          <i className="fas fa-plus"></i>
        </Link>
      </h3>
      <hr />
      <div>

        <ul className="list-group">
          {user.posts.map(post => {
            return (
              <li key={post.id} className="list-group-item d-flex justify-content-between">
                <Link to={`/post/${post.id}`}>
                  <p>{post.title}</p>
                </Link>
                <div>
                <Link to={`/post/${post.id}/edit`}>
                  <i class="fas fa-edit me-4"></i>
                </Link>
                  <button className="btn btn-danger btn-xs pull-right remove-item" onClick={() => handleDelete(post.id)}>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            )}
          )}
        </ul>
      </div>
    </div>
  )
}

export default Profile