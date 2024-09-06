import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailNotification: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // You can add more validation or processing here if needed

    console.log('Email submitted:', email);

    // Redirect to /ticket-page after submission
    navigate('/search');
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="email-notification-container bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
            Please input your e-mail so as to get notifications as regards your order:
          </label>
          <input
            type="email"
            id="email-input"
            placeholder="Please input your e-mail"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default EmailNotification;
