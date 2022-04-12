import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../../services/PostService';

const PostDetail = () => {
  const [post, setPost] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getPost(id)
      .then(post => setPost(post))
  },[])

  return (
    <div>
      <h1 className="text-primary text-center my-4" style={{ fontSize: "45px"}}>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content}}
      />
    </div>
  );
};

export default PostDetail;