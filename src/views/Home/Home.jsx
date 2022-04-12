import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/UsersService'
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers()
      .then(users => {
        setUsers(users)
      })
  }, [])

  console.log(users)

  return (
    <div className="container">
      <h1 className="py-4"><b>Find your interests!</b></h1>
      <hr />
      <div className="row gx-3">
        {users.map((user, i) => {
          return (
            <div key={user._id} className="col-4 g-2">
              <div className="card text-center" key={user._id}>
                <div className="card-header">
                  {user.name}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.posts.length}</p>
                  <Link to={`/users/${user.id}`} className="btn btn-primary">View posts</Link>
                </div>
                <div className="card-footer text-muted">
                  last update {i + 1} days ago
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
};

export default Home;