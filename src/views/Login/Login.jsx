import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputGroup from "../../components/InputGroup";
import { useState } from "react";
import { login as loginRequest } from "../../services/AuthService";
import { useAuthContext } from "../../contexts/AuthContext";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
}).required();

const Login = () => {
  const { login } = useAuthContext()

  const [error, setError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    setIsSubmitting(true)
    setError()

    loginRequest(data)
      .then(response => {
        login(response.access_token)
      })
      .catch((err) => {
        setError(err?.response?.data?.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  };
  return (
    <div className="Login">
      <h1 className="mt-3">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Email"
          id="email"
          register={register}
          error={errors.email?.message}
          type="email"
        />
        <InputGroup
          label="Password"
          id="password"
          register={register}
          error={error || errors.password?.message}
          type="password"
        />

        <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Login...' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default Login