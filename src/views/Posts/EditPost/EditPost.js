import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { getPost, updatePost } from '../../../services/PostService';
import { useAuthContext } from '../../../contexts/AuthContext';
import HtmlEditorComponent from '../NewPost/HtmlEditorComponent';
import InputGroup from '../../../components/InputGroup';


const EditPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [post, setPost] = useState(null)
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()
  const { getUser } = useAuthContext()
  const { id } = useParams()
  const methods = useForm();

  useEffect(() => {
    getPost(id)
      .then(post => {
        setPost(post)
        methods.reset({ content: post.content, title: post.title })
      })
  }, [])

  const onSubmit = methods.handleSubmit((data) => {
    const { content, title } = data

    if (!content || !title) {
      setErrors(true)
    } else {
      updatePost(post.id, data)
      .then((post) => {
        getUser()
        navigate('/profile')
      })
      .catch(err => {
        setErrors(err?.response?.data?.errors)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="mt-4">
        <h1 className="mb-4">Edit your post!</h1>
        <form onSubmit={onSubmit}>
          {errors && <div className="alert alert-dark" role="alert">You must include some content!</div>}
          <InputGroup
            label="Título"
            id="title"
            register={methods.register}
            type="text"
          />
          <HtmlEditorComponent
            initialValue={post ? post.content : null}
            name="content"
            onFocusCb={() => setErrors(false)}
          />
         <div className="text-center wv-100  mt-4 ">
            <button className={`btn w-100 btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating user...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditPost;