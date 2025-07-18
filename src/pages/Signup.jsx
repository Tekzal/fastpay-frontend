import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOfferCode, checkEmailAvailability, signup } from '../services/api';

function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [offerCodeMessage, setOfferCodeMessage] = useState('');
  const [emailStatus, setEmailStatus] = useState({ checking: false, available: null, message: '' });
  const [form, setForm] = useState({
    // Organization details
    schoolName: '',
    contactEmail: '',
    phone: '',
    address: '',
    // Admin user details
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Offer code
    offerCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Check email availability when email field changes
    if (e.target.name === 'email') {
      checkEmailAvailabilityDebounced(e.target.value);
    }
  };

  // Debounced email availability check
  const checkEmailAvailabilityDebounced = (() => {
    let timeoutId;
    return (email) => {
      clearTimeout(timeoutId);
      
      if (!email || email.length < 3) {
        setEmailStatus({ checking: false, available: null, message: '' });
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailStatus({ checking: false, available: null, message: 'Please enter a valid email address' });
        return;
      }

      setEmailStatus({ checking: true, available: null, message: 'Checking availability...' });
      
      timeoutId = setTimeout(async () => {
        try {
          console.log('Checking email availability for:', email);
          
          // TEMPORARY: Skip email check if endpoint is not ready
          // Remove this when your backend endpoint is ready
          if (import.meta.env.VITE_SKIP_EMAIL_CHECK === 'true') {
            console.log('Skipping email check (development mode)');
            setEmailStatus({ 
              checking: false, 
              available: true, 
              message: 'Email check skipped (dev mode)'
            });
            return;
          }

          // Debug: Log environment variables
          console.log('Environment variables:', {
            VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
            VITE_SKIP_EMAIL_CHECK: import.meta.env.VITE_SKIP_EMAIL_CHECK
          });
          
          const response = await checkEmailAvailability(email);
          console.log('Email check response:', response);
          
          // Handle different response structures
          const isAvailable = response.available !== undefined ? response.available : 
                             response.is_available !== undefined ? response.is_available :
                             response.status === 'available';
          
          setEmailStatus({ 
            checking: false, 
            available: isAvailable, 
            message: isAvailable ? 'Email is available' : 'Email is already taken'
          });
        } catch (error) {
          console.error('Email check error details:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url
          });
          
          // Handle specific error cases
          if (error.response?.status === 400) {
            setEmailStatus({ 
              checking: false, 
              available: false, 
              message: 'Invalid email format'
            });
          } else if (error.response?.status === 404) {
            setEmailStatus({ 
              checking: false, 
              available: null, 
              message: 'Email check endpoint not found. Please contact support.'
            });
          } else if (error.response?.status === 422) {
            // Handle validation errors
            const errorData = error.response?.data;
            console.log('Validation error details:', errorData);
            console.log('Full validation error:', JSON.stringify(errorData, null, 2));
            
            if (errorData?.detail && Array.isArray(errorData.detail)) {
              const firstError = errorData.detail[0];
              console.log('First validation error:', firstError);
              
              if (firstError?.msg) {
                setEmailStatus({ 
                  checking: false, 
                  available: null, 
                  message: `Validation error: ${firstError.msg}`
                });
              } else {
                setEmailStatus({ 
                  checking: false, 
                  available: null, 
                  message: 'Invalid request format'
                });
              }
            } else if (errorData?.detail) {
              setEmailStatus({ 
                checking: false, 
                available: null, 
                message: `Validation error: ${errorData.detail}`
              });
            } else if (errorData?.email) {
              setEmailStatus({ 
                checking: false, 
                available: null, 
                message: `Email error: ${errorData.email}`
              });
            } else {
              setEmailStatus({ 
                checking: false, 
                available: null, 
                message: 'Invalid email format'
              });
            }
          } else if (error.response?.status === 429) {
            setEmailStatus({ 
              checking: false, 
              available: null, 
              message: 'Too many requests. Please wait a moment.'
            });
          } else if (error.response?.status === 500) {
            setEmailStatus({ 
              checking: false, 
              available: null, 
              message: 'Server error. Please try again.'
            });
          } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
            setEmailStatus({ 
              checking: false, 
              available: null, 
              message: 'Network error. Please check your connection.'
            });
          } else {
            setEmailStatus({ 
              checking: false, 
              available: null, 
              message: `Unable to check email availability (${error.response?.status || 'unknown error'})`
            });
          }
        }
      }, 500); // 500ms delay
    };
  })();

  const handleRequestOfferCode = async () => {
    console.log('Contact email from form:', form.contactEmail);
    
    if (!form.contactEmail) {
      setOfferCodeMessage('Please enter your contact email first.');
      setTimeout(() => setOfferCodeMessage(''), 5000);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.contactEmail)) {
      setOfferCodeMessage('Please enter a valid contact email address.');
      setTimeout(() => setOfferCodeMessage(''), 5000);
      return;
    }

    try {
      const response = await requestOfferCode(form.contactEmail);
      console.log('Offer code response:', response);
      
      if (response.offer_code) {
        setOfferCodeMessage(`Your offer code is: "${response.offer_code}". Please check your email or use this code to continue.`);
        // Auto-fill the offer code field
        setForm(prev => ({ ...prev, offerCode: response.offer_code }));
      } else {
        setOfferCodeMessage('Offer code has been generated. Please check your email.');
      }
      setTimeout(() => setOfferCodeMessage(''), 5000);
    } catch (error) {
      console.error('Request offer code error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        setOfferCodeMessage('Invalid email format. Please check your contact email.');
      } else if (error.response?.status === 422) {
        const errorData = error.response?.data;
        console.log('Offer code validation error:', errorData);
        console.log('Full validation error details:', JSON.stringify(errorData, null, 2));
        
        if (errorData?.detail && Array.isArray(errorData.detail)) {
          const firstError = errorData.detail[0];
          console.log('First validation error:', firstError);
          
          if (firstError?.msg) {
            setOfferCodeMessage(`Validation error: ${firstError.msg}`);
          } else if (firstError?.loc) {
            setOfferCodeMessage(`Validation error in ${firstError.loc.join('.')}: ${firstError.msg || 'Invalid data'}`);
          } else {
            setOfferCodeMessage('Invalid request format. Please try again.');
          }
        } else if (errorData?.detail) {
          setOfferCodeMessage(`Validation error: ${errorData.detail}`);
        } else {
          setOfferCodeMessage('Invalid request format. Please try again.');
        }
      } else if (error.response?.status === 404) {
        setOfferCodeMessage('Offer code service not available. Please contact support.');
      } else if (error.response?.status === 500) {
        setOfferCodeMessage('Server error. Please try again later.');
      } else {
        setOfferCodeMessage('Failed to send offer code. Please try again.');
      }
      setTimeout(() => setOfferCodeMessage(''), 5000);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!form.schoolName || !form.contactEmail || !form.phone || !form.address) {
        setError('Please fill in all organization details.');
        return;
      }
    } else if (currentStep === 2) {
      if (!form.username || !form.email || !form.password || !form.confirmPassword) {
        setError('Please fill in all admin user details.');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (emailStatus.available === false) {
        setError('Please choose a different email address.');
        return;
      }
      if (emailStatus.checking) {
        setError('Please wait while we check email availability.');
        return;
      }
    }
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.offerCode) {
      setError('Please enter your offer code.');
      return;
    }
    setLoading(true);
    
    // Prepare signup data matching backend format
    const signupData = {
      organization: {
        name: form.schoolName,
        contact_email: form.contactEmail,
        phone: form.phone,
        address: form.address
      },
      user: {
        username: form.username,
        email: form.email,
        password: form.password,
        role: 'admin' // Required: "admin", "manager", or "cashier"
      },
      offer_code: form.offerCode
    };

    try {
      console.log('Submitting signup data:', signupData);
      const response = await signup(signupData);
      console.log('Signup successful:', response);
      
      setLoading(false);
      setSuccess('Account created! You can now log in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        setError('Invalid signup data. Please check your information.');
      } else if (error.response?.status === 409) {
        setError('An account with this email or username already exists.');
      } else if (error.response?.status === 422) {
        setError('Please check your offer code and try again.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to create account. Please try again.');
      }
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
        <input
          id="schoolName"
          name="schoolName"
          type="text"
          required
          className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Enter your school name"
          value={form.schoolName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          required
          className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Enter contact email"
          value={form.contactEmail}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          id="address"
          name="address"
          required
          rows={3}
          className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Enter school address"
          value={form.address}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {/* Admin Role Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-blue-800">You will be set up as the Administrator</span>
        </div>
        <p className="text-xs text-blue-600 mt-1">As the first user, you'll have full administrative access to manage your school's payment system.</p>
      </div>
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Choose a username"
          value={form.username}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`block w-full px-3 py-3 border placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 ${
            emailStatus.checking 
              ? 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500' 
              : emailStatus.available === true 
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500' 
                : emailStatus.available === false 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        {emailStatus.message && (
          <div className={`mt-1 text-sm flex items-center gap-1 ${
            emailStatus.checking 
              ? 'text-yellow-600' 
              : emailStatus.available === true 
                ? 'text-green-600' 
                : emailStatus.available === false 
                  ? 'text-red-600' 
                  : 'text-gray-600'
          }`}>
            {emailStatus.checking && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {emailStatus.available === true && (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {emailStatus.available === false && (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {emailStatus.message}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="block w-full px-3 py-3 pr-12 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 z-20"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7-2c-1.657-4-6-7-10-7S3.657 6 2 10c1.657 4 6 7 10 7s8.343-3 10-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            className="block w-full px-3 py-3 pr-12 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 z-20"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7-2c-1.657-4-6-7-10-7S3.657 6 2 10c1.657 4 6 7 10 7s8.343-3 10-7z" />
              </svg>
            )}
          </button>
        </div>
        {form.password && form.confirmPassword && (
          <div className={`text-sm flex items-center gap-2 ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
            {form.password === form.confirmPassword ? (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Passwords match
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Passwords do not match
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="offerCode" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          Offer Code
          <span className="ml-1 text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">Required for 6mo free</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="offerCode"
            name="offerCode"
            type="text"
            required
            className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            placeholder="Enter your offer code"
            value={form.offerCode}
            onChange={handleChange}
            disabled={loading}
          />
          <button 
            type="button" 
            onClick={handleRequestOfferCode}
            className="text-xs text-indigo-600 hover:underline focus:outline-none focus:underline px-2 py-1 rounded transition-colors border border-indigo-100 bg-indigo-50"
          >
            Request Offer Code
          </button>
        </div>
        {offerCodeMessage && (
          <div className="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
            {offerCodeMessage}
          </div>
        )}
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Organization Details';
      case 2: return 'Admin User Details';
      case 3: return 'Offer Code';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Freemium Banner */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow flex flex-col items-center">
          <div className="flex items-center gap-2 text-2xl font-bold mb-1">
            <span role="img" aria-label="gift">🎉</span> 6 Months Free!
          </div>
          <div className="text-sm font-medium">All new users get 6 months of premium access. After that, upgrade or vacate the platform.</div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{getStepTitle()}</span>
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-8 8a8 8 0 1116 0H8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to access Fastpay School Payment System</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">{success}</div>
          )}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing up...
                  </div>
                ) : (
                  'Sign up'
                )}
              </button>
            )}
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-indigo-600 hover:underline focus:outline-none focus:underline transition-colors"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup; 