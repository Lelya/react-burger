import {ChangeEvent, useState} from 'react';
import {TFormUser} from "../utils/types";

export function useForm(inputValues: TFormUser) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}