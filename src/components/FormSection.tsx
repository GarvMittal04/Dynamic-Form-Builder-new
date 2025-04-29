import React, { useEffect, useState } from 'react';
import { FormField, FormData, FormSection } from '../types/form';
import { validateSection } from '../utils/validation';
import * as FormFields from './FormFields';

interface FormSectionProps {
  section: FormSection;
  formData: FormData;
  onUpdateFormData: (newData: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit: () => void;
}

const FormSectionComponent: React.FC<FormSectionProps> = ({
  section,
  formData,
  onUpdateFormData,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onSubmit
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize form data for this section if fields don't exist in formData
  useEffect(() => {
    const newData: FormData = { ...formData };
    let dataUpdated = false;

    section.fields.forEach(field => {
      if (!(field.fieldId in formData)) {
        if (field.type === 'checkbox') {
          newData[field.fieldId] = [];
        } else {
          newData[field.fieldId] = '';
        }
        dataUpdated = true;
      }
    });

    if (dataUpdated) {
      onUpdateFormData(newData);
    }
  }, [section, formData, onUpdateFormData]);

  const handleChange = (fieldId: string, value: string | string[]) => {
    onUpdateFormData({
      ...formData,
      [fieldId]: value
    });

    // Mark field as touched
    if (!touched[fieldId]) {
      setTouched({
        ...touched,
        [fieldId]: true
      });
    }
  };

  const validateAndProceed = () => {
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    section.fields.forEach(field => {
      allTouched[field.fieldId] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const { isValid, errors: validationErrors } = validateSection(section.fields, formData);
    setErrors(validationErrors);

    if (isValid) {
      if (isLast) {
        onSubmit();
      } else {
        onNext();
      }
    }
  };

  const renderField = (field: FormField) => {
    const error = touched[field.fieldId] ? errors[field.fieldId] : undefined;

    switch (field.type) {
      case 'text':
        return (
          <FormFields.TextField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'email':
        return (
          <FormFields.EmailField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'tel':
        return (
          <FormFields.TelField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'textarea':
        return (
          <FormFields.TextAreaField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'date':
        return (
          <FormFields.DateField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'dropdown':
        return (
          <FormFields.DropdownField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'radio':
        return (
          <FormFields.RadioField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] as string || ''}
            onChange={handleChange}
            error={error}
          />
        );
      case 'checkbox':
        return (
          <FormFields.CheckboxField
            key={field.fieldId}
            field={field}
            value={(formData[field.fieldId] as string[]) || []}
            onChange={handleChange as any}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-indigo-700">{section.title}</h2>
      <p className="text-gray-600 mb-6">{section.description}</p>
      
      <div className="space-y-4">
        {section.fields.map(renderField)}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className={`px-4 py-2 rounded ${
            isFirst
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isFirst}
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={validateAndProceed}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          {isLast ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FormSectionComponent;