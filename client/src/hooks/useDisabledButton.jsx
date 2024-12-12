/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

function useDisableButton(inputValues, validationRules, buttonDisabled, setButtonDisabled) {
    useEffect(() => {
        if(validationRules){
        const disabled = validateInput(validationRules, inputValues)
        setButtonDisabled(disabled)
        }
    }, [inputValues, validationRules, setButtonDisabled]);
    return buttonDisabled;
}

function validateInput(validationRules, inputValues){
    if (validationRules) {
        const dateValidationRules = validationRules.dateValidation
        const textValidationRules = validationRules.textValidation
        if (dateValidationRules !== undefined) {
            const isDateValid = Object.keys(dateValidationRules).every(
                field => dateValidationRules[field]?.isValid
            );
            if(!isDateValid){
                return true
            }
        }
        if (textValidationRules) {
            const isTextInputValid = Object.keys(textValidationRules).every(field =>
                textValidationRules[field]?.(inputValues[field])
            );
            if(!isTextInputValid){
                return true
            }
        }
        return false
    }
}
export default useDisableButton;
