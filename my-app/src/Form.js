import { useState, useRef } from 'react';
import InputSet from './InputSet';
import Alert from './Alert';
import AttractionRepository from './repository/AttractionRepository';

export default function Form({ type, attraction }) {
    const id = (type === 'edit') ? attraction.id : null;

    const [inputValues, setInputValues] = useState(
        type === 'edit'
            ? attraction
            : {
                name: '',
                settlement: '',
                address: '',
                category: '',
                price: 0,
                note: '',
                recommended: [],
                gender: ''
            }
    )

    const [formWasValidated, setFormWasValidated] = useState(false);

    const [alert, setAlert] = useState({
        message: '',
        type: '',
    })

    const [errors, setErrors] = useState({
        fullName: '',
        settlement: '',
        address: '',
        category: '',
        price: '',
        note: '',
        recommended: '',
        gender: ''
    })

    const references = {
        name: useRef(),
        settlement: useRef(),
        address: useRef(),
        category: useRef(),
        price: useRef(),
        note: useRef(),
        recommended: useRef(),
        gender: useRef()
    };

    //console.log(references);

    const errorTypes = {
        required: 'Hiányzó érték',
        length1000: 'Nem lehet több, mint 1000 karakter',
        negativePrice: 'Nem lehet kisebb, mint 0',
        mustChooseOne: 'Legalább egyet kötelező kiválasztani'
    };

    const validators = {
        name: {
            required: isNotEmpty,
        },
        settlement: {
            required: isNotEmpty,
        },
        address: {
            required: isNotEmpty,
        },
        category: {
            required: isNotEmpty,
        },
        price: {
            required: isNotEmpty,
            negativePrice: isNotNegative,
        },
        note: {
            length1000: isLengthLessThan1000
        },
        recommended: {
            mustChooseOne: isOneOptionChoosen,
        },
        gender: {
            required: isNotEmpty,
        },
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

    function isOneOptionChoosen(value) {
        return value.length >= 1;
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

    function handleCheckboxChange(e) {
        const checkbox = e.target;
        setInputValues({
            ...inputValues,
            [checkbox.name]: checkbox.checked
                ? [...inputValues.recommended, checkbox.value]
                : inputValues.recommended.filter(value => value !== checkbox.value)
        })
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
                await AttractionRepository.insert(inputValues);
                setAlert({
                    message: 'Sikeres mentés',
                    type: 'success'
                });
                setInputValues({
                    name: '',
                    settlement: '',
                    address: '',
                    category: '',
                    price: '',
                    note: ''
                })
            };
            if (type === 'edit') {
                await AttractionRepository.update(id, inputValues)
                setAlert({
                    message: 'Sikeres mentés',
                    type: 'success'
                });
            }
            setFormWasValidated(false);
        } else {
            setFormWasValidated(true);
        }
    }

    const categoryOptions = [
        {
            value: "",
            text: "Válassz!"
        },
        {
            value: "múzeum"
        },
        {
            value: "étterem"
        },
        {
            value: "építmény"
        }
    ];

    const recommendedOptions = ['családok', 'párok', 'szinglik'];
    const genderOptions = ['férfi', 'nő', 'egyéb'];

    return (
        <div className="container">
            <form
                className={`"need-validation" ${formWasValidated ? "was-validated" : ''}`}
                noValidate={true}
                onSubmit={handleFormSubmit}>
                <InputSet
                    reference={references['name']}
                    name="name"
                    labelText="Megnevezés"
                    type="text"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['settlement']}
                    name="settlement"
                    labelText="Település"
                    type="text"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['address']}
                    name="address"
                    labelText="Cím"
                    type="text"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['category']}
                    name="category"
                    labelText="Kategória"
                    type="select"
                    options={categoryOptions}
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['price']}
                    name="price"
                    labelText="Ár"
                    type="number"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <InputSet
                    reference={references['note']}
                    name="note"
                    labelText="Megjegyzés"
                    type="textarea"
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={false}
                />
                <InputSet
                    reference={references['recommended']}
                    name="recommended"
                    labelText="Ajánlott"
                    type="checkbox"
                    options={recommendedOptions}
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleCheckboxChange}
                    required={false}
                />
                <InputSet
                    reference={references['gender']}
                    name="gender"
                    labelText="Nem"
                    type="radio"
                    options={genderOptions}
                    errors={errors}
                    inputValues={inputValues}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                    required={true}
                />
                <button type="submit" className="btn btn-primary mt-3">Mentés</button>
            </form>
            {alert.message !== '' && <Alert message={alert.message} type={alert.type} />}
        </div>
    )
}