import React from 'react';
import { FormField } from '../../types/form';

interface RadioFieldProps {
  field: FormField;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field.fieldId, e.target.value);
  };

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </div>
      <div className="space-y-2">
        {field.options?.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${field.fieldId}-${option.value}`}
              name={field.fieldId}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              required={field.required}
              data-testid={option.dataTestId}
            />
            <label
              htmlFor={`${field.fieldId}-${option.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RadioField;