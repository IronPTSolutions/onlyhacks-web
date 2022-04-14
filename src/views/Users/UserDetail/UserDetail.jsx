import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserDetail } from '../../../services/UsersService';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const UserDetail = () => {
  const [currentUser, setCurrentUser] = useState({})
  const { user } = useAuthContext()
  const { id } = useParams()

  useEffect(() => {
    getUserDetail(id)
      .then(user => {
        setCurrentUser(user)
      })
  }, [])

  return (
    <div className="Profile">
    <h1 className="my-4 pb-3">
      <b>{currentUser.name}</b>
      {!user?.subscriptions.some(sub => sub.targetUser.id === currentUser.id) &&
        <Link className="btn btn-small btn-secondary ms-4" to={`/subscribe/${currentUser._id}`}>Subscribe</Link>
      }

    </h1>
    <h3>Posts</h3>
    <hr />
    <div>
      <ul className="list-group">
        {currentUser.posts?.map((post, i) => {
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