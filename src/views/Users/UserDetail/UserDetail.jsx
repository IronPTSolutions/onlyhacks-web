import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserDetail } from '../../../services/UsersService';
import { Link, useParams } from 'react-router-dom';

const UserDetail = () => {
  const [user, setUser] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getUserDetail(id)
      .then(user => {
        setUser(user)
      })
  }, [])

  return (
    <div className="Profile">
    <h1 className="my-4 pb-3">
      <b>{user.name}</b>
      <Link className="btn btn-small btn-secondary ms-4" to={`/subscribe/${user._id}`}>Subscribe</Link>
    </h1>
    <h3>Posts</h3>
    <hr />
    <div>
      <ul className="list-group">
        {user.posts?.map((post, i) => {
          return (
            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link className="text-reset text-decoration-none" to={`/post/${post.id}`}>
                <p className="m-0">{i + 1}. {post.title}</p>
              </Link>
            </li>
          )}
        )}
      </ul>
    </div>
  </div>
  );
};

export default UserDetail;