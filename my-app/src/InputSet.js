export default function InputFieldSet(
    {
        errors,
        inputValues,
        handleInputChange,
        handleInputBlur,
        type,
        name,
        placeholder,
        labelText,
        required,
        reference,
        options
    }) {

    const errorFeedback = <div
        className="invalid-feedback"
    >
        {errors[name]}
    </div>

    let inputField;

    if (type === "select") {
        inputField = <select
            id={name}
            name={name}
            required={required}
            className={"form-select"}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            ref={reference}
            value={inputValues[name]}
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>{option.text ? option.text : option.value}</option>
            ))}
        </select>;
    } else if (type === "textarea") {
        inputField = <textarea
            className="form-control"
            id={name}
            name={name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            required={required}
            ref={reference}
            rows="3"
            value={inputValues[name]}
        />
    } else if (type === "checkbox" || type === "radio") {
        inputField = options.map((option, index) => (
            <div className={`form-check ${errors[name] !== '' ? "was-validated" : ""}`} key={option}>
                <label className={'form-check-label'} htmlFor={option}>{option}</label>
                <input
                    required={required}
                    ref={reference}
                    className={'form-check-input'}
                    type={type}
                    value={option}
                    key={option}
                    id={option}
                    name={name}
                    onChange={handleInputChange}
                    checked={inputValues[name] && inputValues[name].includes(option)}
                >
                </input>
                {index === options.length - 1 ? errorFeedback : ''}
            </div>
        ))
    } else {
        inputField = <input
            type={type}
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            value={inputValues[name]}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            required={required}
            ref={reference}
        />
    }

    return (
        <>
            {type === 'checkbox' || type === 'radio'
                ? <div className="mb-3">
                    <label className="form-label">{labelText}</label>
                    {inputField}
                </div>
                : <div className={`mb-3 ${errors[name] !== '' ? "was-validated" : ""}`}>
                    <label htmlFor={name} className="form-label">{labelText}</label>
                    {inputField}
                    {errorFeedback}
                </div>}
        </>
    );
}