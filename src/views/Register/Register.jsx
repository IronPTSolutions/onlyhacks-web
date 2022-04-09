import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import InputGroup from "../../components/InputGroup"
import { register as registerRequest } from '../../services/UsersService'

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(8, 'holi').required()
}).required();

const Register = () => {
  const [backErrors, setBackErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    setBackErrors({})
    setIsSubmitting(true)

    registerRequest(data)
      .then((user) => {
        navigate('/login')
      })
      .catch(err => {
        setBackErrors(err?.response?.data?.errors)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  };

  return (
    <div className="Register">
      <h1 className="mt-3">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Email"
          id="email"
          register={register}
          error={backErrors?.email || errors.email?.message}
          type="email"
        />
        <InputGroup
          label="Name"
          id="name"
          register={register}
          error={backErrors?.name || errors.name?.message}
        />
        <InputGroup
          label="Password"
          id="password"
          register={register}
          error={backErrors?.password || errors.password?.message}
          type="password"
        />

        <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating user...' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default Register