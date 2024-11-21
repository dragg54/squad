/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function useDisableButton(inputValues, validationRules) {
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        const isValid = Object.keys(validationRules).every(field =>
            validationRules[field](inputValues[field])
        );
        setIsDisabled(!isValid);
    }, [inputValues]);
    return isDisabled;
}

export default useDisableButton