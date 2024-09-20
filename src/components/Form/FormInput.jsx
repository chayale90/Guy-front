

const FormInput = ({ type, name, className, placeholder, value, onChange, required }) => {
    return (
        <input
            type={type}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    )
}

export default FormInput