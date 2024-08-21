const validateInput = (value, rules) => {
    const errors = [];
  
    if (rules.required && !value.trim()) {
      errors.push('This field is required.');
    }
  
    if (rules.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      errors.push('Invalid email address.');
    }
  
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters.`);
    }
  
    return errors;
  };
  
  export default validateInput;
  