const validateInput = (inputName, value, rules) => {
  if (rules.required && (!value || !value.trim())) {
    return { [inputName]: 'This field is required.' };
  }

  if (rules.email && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return { [inputName]: 'Invalid email address.' };
  }

  if (rules.minLength && value && value.length < rules.minLength) {
    return { [inputName]: `Must be at least ${rules.minLength} characters.` };
  }

  if (rules.isValid === false) {
    return { [inputName]: rules.message || 'Invalid value.' };
  }

  return null;
};

export function validateForm(input, validationRules) {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const error = validateInput(field, input[field], validationRules[field]);
    if (error) {
      errors[field] = error[field];
    }
  });

  return {
    errors,
    hasErrors: Object.keys(errors).length > 0,
  };
}
