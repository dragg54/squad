const validateInput = (inputName, value, rules) => {
  if (rules.required && (!value || !value.trim())) {
    return { [inputName]: 'This field is required.' };
  }

  if (rules.isEmail && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return { [inputName]: 'Invalid email address.' };
  }

  if (rules.minLength && value && value.length < rules.minLength) {
    return { [inputName]: `Must be at least ${rules.minLength} characters.` };
  }

  if (rules.isValid === false) {
    return { [inputName]: rules.message || 'Invalid value.' };
  }

  if (rules.noWhiteSpace && !value.trim()) {
    return { [inputName]: `Invalid input` }
  }

  if (rules.isDDMMDate) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/
    if (!regex.test(value)) {
      return { [inputName]: "Please enter a valid date in DD/MM format" }
    }
    else {
      const [day, month] = value.split('/').map(Number);
      if (
        (month === 2 && day > 29) ||
        ([4, 6, 9, 11].includes(month) && day > 30)
      ) {
        return { [inputName]: "Invalid date for the given month" }
      }
    }
  }

  if (rules.isPassword) {
    if (value.length < 8) {
      return { [inputName]: 'Password must contain minimum of 8 characters' }
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
      return {
        [inputName]:
          'Password must include at least one uppercase letter, one lowercase letter, and one number.'
      }
    } else if (!value.trim()) {
      return {
        [inputName]: 'Password cannot contain only whitespace.'
      }
    }
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
