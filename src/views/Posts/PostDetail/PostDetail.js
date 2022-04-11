import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../../services/PostService';

const PostDetail = () => {
  const [post, setPost] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getPost(id)
      .then(post => setPost(post))
  })

  return (
    <div>
      {post.title}
      <div
        dangerouslySetInnerHTML={{__html: post.content}}
      />
    </div>
  );
};

export default PostDetail;