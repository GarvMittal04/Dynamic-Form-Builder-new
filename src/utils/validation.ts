import { FormField, FormData } from '../types/form';

export const validateField = (field: FormField, value: string | string[] | boolean): string => {
  // Empty check for required fields
  if (field.required && (value === '' || value === undefined || value === null || 
      (Array.isArray(value) && value.length === 0))) {
    return field.validation?.message || `${field.label} is required`;
  }

  // Skip further validation if field is empty and not required
  if (value === '' || value === undefined || value === null) {
    return '';
  }

  // Type-specific validations
  if (typeof value === 'string') {
    // Min length validation
    if (field.minLength !== undefined && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
    
    // Max length validation
    if (field.maxLength !== undefined && value.length > field.maxLength) {
      return `${field.label} must be at most ${field.maxLength} characters`;
    }

    // Email validation
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }

    // Phone validation
    if (field.type === 'tel' && !/^[0-9]{10}$/.test(value)) {
      return 'Please enter a valid 10-digit phone number';
    }
  }

  return '';
};

export const validateSection = (fields: FormField[], formData: FormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  fields.forEach(field => {
    const value = formData[field.fieldId];
    const error = validateField(field, value);
    
    if (error) {
      errors[field.fieldId] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};