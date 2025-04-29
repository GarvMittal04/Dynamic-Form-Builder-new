import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import DynamicForm from './components/DynamicForm';
import { FormResponse, FormData, UserLoginData } from './types/form';
import { getFormData } from './api/api';
import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserLoginData | null>(null);
  const [formData, setFormData] = useState<FormResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleLoginSuccess = async (data: UserLoginData) => {
    setUserData(data);
    setLoading(true);
    setError(null);

    try {
      const fetchedFormData = await getFormData(data.rollNumber);
      
      if (fetchedFormData) {
        setFormData(fetchedFormData);
        setIsLoggedIn(true);
      } else {
        setError('Failed to fetch form data. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching form data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormComplete = (data: FormData) => {
    console.log('Form submission data:', data);
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setFormData(null);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-lg text-gray-700">Loading form data...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : isSubmitted ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you, {userData?.name}! Your form has been submitted successfully.
            </p>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Form Data (Console Output):</h3>
              <p className="text-sm text-gray-500 mb-2">The form data has been logged to the console.</p>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 text-indigo-500 mr-2" />
                <code className="text-xs">console.log(formData)</code>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Start Over
            </button>
          </div>
        ) : !isLoggedIn ? (
          <div className="w-full animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-700 mb-2">Dynamic Form Builder</h1>
              <p className="text-gray-600">Please log in to access your form</p>
            </div>
            <div className="flex justify-center">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <DynamicForm formData={formData!} onComplete={handleFormComplete} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;