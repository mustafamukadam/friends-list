import { useState } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (value) => {
        let isValid = true;
        if (value === '') {
            setErrors(error => ({ ...error, name: 'Name cannot be empty!' }));
            isValid = false;
        }
        if (!(/^[a-zA-Z ]*$/.test(value))) {
            setErrors(error => ({ ...error, alphabets: 'Name must contain alphabets only!' }));
            isValid = false;
        }
        return isValid;
    }

    return [errors, setErrors, validateForm];
}
