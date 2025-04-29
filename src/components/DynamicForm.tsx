import React, { useState } from 'react';
import { FormResponse, FormData } from '../types/form';
import FormSection from './FormSection';

interface DynamicFormProps {
  formData: FormResponse;
  onComplete: (formData: FormData) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData, onComplete }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formValues, setFormValues] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { form } = formData;
  const currentSection = form.sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === form.sections.length - 1;

  const handleNext = () => {
    if (currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (newData: FormData) => {
    setFormValues({
      ...formValues,
      ...newData
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Submit the complete form data
    onComplete(formValues);
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">{form.formTitle}</h1>
        <div className="flex justify-center items-center mb-4">
          <span className="text-sm text-gray-500">Form ID: {form.formId}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-500">Version: {form.version}</span>
        </div>
        
        <div className="relative pt-1 mb-6">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {currentSectionIndex + 1} of {form.sections.length} sections
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{
                width: `${((currentSectionIndex + 1) / form.sections.length) * 100}%`
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <FormSection
        section={currentSection}
        formData={formValues}
        onUpdateFormData={updateFormData}
        onNext={handleNext}
        onPrev={handlePrevious}
        isFirst={isFirstSection}
        isLast={isLastSection}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DynamicForm;