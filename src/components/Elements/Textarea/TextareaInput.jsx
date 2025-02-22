const TextareaInput = ({name, className, placeholder, value, onChange}) => {
    return (
        <textarea name={name} className={`textarea textarea-bordered w-full ${className}`} value={value} placeholder={placeholder} onChange={onChange}></textarea>
    )
}

export default TextareaInput