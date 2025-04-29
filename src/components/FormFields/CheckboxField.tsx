import React from 'react';
import { FormField } from '../../types/form';

interface CheckboxFieldProps {
  field: FormField;
  value: string[];
  onChange: (id: string, value: string[]) => void;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: optionValue } = e.target;
    
    if (checked) {
      onChange(field.fieldId, [...value, optionValue]);
    } else {
      onChange(field.fieldId, value.filter(v => v !== optionValue));
    }
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
              type="checkbox"
              id={`${field.fieldId}-${option.value}`}
              name={field.fieldId}
              value={option.value}
              checked={value?.includes(option.value) || false}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
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

export default CheckboxField;