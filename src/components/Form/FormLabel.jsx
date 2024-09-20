

const FormLabel = ({ htmlFor, className, text }) => {
    return (
        <label htmlFor={htmlFor}
            className={className}>
            {text}
        </label>
    )
}

export default FormLabel