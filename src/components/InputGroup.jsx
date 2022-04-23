const InputGroup = ({ label, id, name, type, placeholder, register, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id}
        placeholder={placeholder}
        {...register(id)}
      />
      <p className="invalid-feedback">{error}</p>
    </div>
  )
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup