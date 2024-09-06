import React, { useState } from 'react'

type Props = {}

const InputCompanyNameForFirstTime = (props: Props) => {
    const [isAnyButtonClicked, setIsAnyButtonClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyError, setCompanyError] = useState('');

  const validateEmail = (email: string): boolean => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      } else {
        setEmailError('');
      }
    } 

    //   if (!companyName.trim()) {
    //     setCompanyError('Company name is required');
    //     return;
    //   } else {
    //     setCompanyError('');
    //   }
    
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          {
            // <div>
            //   <input
            //     type="email"
            //     placeholder="Email"
            //     value={email}
            //     onChange={(e) => {
            //       setEmail(e.target.value);
            //       setEmailError('');
            //     }}
            //     className="w-full p-2 border border-gray-300 rounded-md mb-4"
            //     required
            //   />
            //   {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            // </div>
          }
            <div>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setCompanyError('');
                }}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              {companyError && <p className="text-red-500 text-sm">{companyError}</p>}
            </div>

          <button
            className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
  )
}

export default InputCompanyNameForFirstTime