import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import HtmlEditorComponent from './HtmlEditorComponent';
import { createPost } from '../../../services/PostService';
import { useAuthContext } from '../../../contexts/AuthContext';
import InputGroup from '../../../components/InputGroup';

const NewPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  const { user, getUser } = useAuthContext()

  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    const { content, title } = data

    if (!content || !title) {
      setErrors(true)
    } else {
      createPost({...data, user})
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
        <h1 className="mb-4">Create your post!</h1>
        {errors && <div className="alert alert-dark" role="alert">Check all fields!</div>}
        <form onSubmit={onSubmit}>
          <InputGroup
            label="Título"
            id="title"
            register={methods.register}
            type="text"
          />
          <HtmlEditorComponent name="content" onFocusCb={() => setErrors(false)}/>
          <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating user...' : 'Submit'}</button>
        </form>
      </div>
    </FormProvider>
  );
};

export default NewPost;