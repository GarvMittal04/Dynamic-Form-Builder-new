import React from 'react';
import { FormField } from '../../types/form';

interface DropdownFieldProps {
  field: FormField;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(field.fieldId, e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.fieldId} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={field.fieldId}
        name={field.fieldId}
        value={value}
        onChange={handleChange}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        required={field.required}
        data-testid={field.dataTestId}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            data-testid={option.dataTestId}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DropdownField;