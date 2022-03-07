import { useState, useRef } from 'react';
import InputSet from './InputSet';
import Alert from './Alert';
import AttractionRepository from './repository/AttractionRepository';

export default function Form({ type, id }) {
    const [inputValues, setInputValues] = useState(
        {
            rogzites: makeTodayDate(),
            villany_ora: '',
            gaz_ora: '',
            viz_ora: '',
            comment: ''
        }
    )

    const [formWasValidated, setFormWasValidated] = useState(false);

    const [alert, setAlert] = useState({
        message: '',
        type: '',
    })

    const [errors, setErrors] = useState({
        rogzites: '',
        villany_ora: '',
        gaz_ora: '',
        viz_ora: '',
        comment: '',
    })

    const references = {
        rogzites: useRef(),
        villany_ora: useRef(),
        gaz_ora: useRef(),
        viz_ora: useRef(),
        comment: useRef(),
    };

    const errorTypes = {
        required: 'Hiányzó érték',
        length1000: 'Nem lehet több, mint 1000 karakter',
        negativePrice: 'Nem lehet kisebb, mint 0',
    };

    const validators = {
        rogzites: {
            required: isNotEmpty,
        },
        villany_ora: {
            required: isNotEmpty,
            negativePrice: isNotNegative
        },
        gaz_ora: {
            required: isNotEmpty,
            negativePrice: isNotNegative
        },
        viz_ora: {
            required: isNotEmpty,
            negativePrice: isNotNegative
        },
        comment: {
            length1000: isLengthLessThan1000
        },
    };

    function makeTodayDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const day = ("0" + now.getDate()).slice(-2);
        const todayDate = year + "-" + month + "-" + day;
        return todayDate;
    }

    function isNotEmpty(value) {
        return value !== '';
    }

    function isNotNegative(value) {
        return value >= 0;
    }

    function isLengthLessThan1000(value) {
        return value.length <= 1000;
    }

    function handleInputChange(e) {
        const fieldName = e.target.name;
        const value = e.target.value;
        setInputValues({
            ...inputValues,
            [fieldName]: value
        });
        setErrors((previousErrors) => ({
            ...previousErrors,
            [fieldName]: ''
        }));
    }

    function handleInputBlur(e) {
        const name = e.target.name;
        validateField(name);
    }

    function validateField(fieldName) {
        if (fieldName === 'id') return true;

        const value = inputValues[fieldName];
        let isFieldValid = true;
        setErrors((previousErrors) => ({
            ...previousErrors,
            [fieldName]: ''
        }));
        references[fieldName].current.setCustomValidity('');

        if (validators[fieldName] !== undefined) {
            for (const [validationRule, validatorFunction] of Object.entries(validators[fieldName])) {
                if (isFieldValid !== false) {
                    isFieldValid = validatorFunction(value);
                    if (!isFieldValid) {
                        const errorText = errorTypes[validationRule];
                        setErrors((previousErrors) => {
                            return ({
                                ...previousErrors,
                                [fieldName]: errorText
                            })
                        });
                        references[fieldName].current.setCustomValidity(errorText);
                    }
                }
            }
        }
        return isFieldValid;

    }

    function isFormValid() {
        let isFormValid = true;
        for (const fieldName of Object.keys(inputValues)) {
            const isFieldValid = validateField(fieldName);
            if (!isFieldValid) {
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setAlert({
            message: '',
            type: '',
        });

        const isValid = isFormValid();

        if (isValid) {
            if (type === 'new') {
                await AttractionRepository.insert({
                    ...inputValues,
                    rogzites: new Date(inputValues.rogzites)
                });
                setAlert({
                    message: 'Sikeres mentés',
                    type: 'success'
                });
            };
            if (type === 'edit') {
                await AttractionRepository.update(id, {
                    ...inputValues,
                    rogzites: new Date(inputValues.rogzites)
                })
                setAlert({
                    message: 'Sikeres módosítás',
                    type: 'success'
                });
            }
            setFormWasValidated(false);
            setInputValues({
                rogzites: makeTodayDate(),
                villany_ora: '',
                gaz_ora: '',
                viz_ora: '',
                comment: ''
            });
        } else {
            setFormWasValidated(true);
        }
    }

    return (
        <div className="container">
            <form
                className={`"need-validation" ${formWasValidated ? "was-validated" : ''}`}
                noValidate={true}
                onSubmit={handleFormSubmit}>
                <InputSet
                    reference={references['rogzites']}
                    name="rogzites"
                    labelText="Rögzítés időpontja"
                    type="date"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['villany_ora']}
                    name="villany_ora"
                    labelText="Villanyóra állás"
                    type="number"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['gaz_ora']}
                    name="gaz_ora"
                    labelText="Gázóra állás"
                    type="number"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['viz_ora']}
                    name="viz_ora"
                    labelText="Vízóra állás"
                    type="number"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['comment']}
                    name="comment"
                    labelText="Megjegyzés"
                    type="textarea"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={false}
                />
                <button type="submit" className="btn btn-primary mt-3">Mentés</button>
            </form>
            {alert.message !== '' && <Alert message={alert.message} type={alert.type} />}
        </div>
    )
}