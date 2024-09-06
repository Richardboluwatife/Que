import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Sme {
  id: string;
  name: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sme, setSme] = useState<Sme[]>([]);
  const [filteredCompanies, setFilteredSme] = useState<Sme[]>([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchSme = async () => {
      // Mock API call
      // Replace with your actual API call
      const response = await fetch('/api/sme');
      const data = await response.json();
      setSme(data);
    };

    fetchSme();
  }, []);

  useEffect(() => {
    const filtered = sme.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSme(filtered);
  }, [searchTerm, sme]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (filteredCompanies.length > 0) {
      navigate('/ticket-page');
    } else {
      alert('No company found. Please search again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="companySearch" className="block text-lg font-medium text-gray-700">
            Search For the Company You Order From:
          </label>
          <input
            type="text"
            id="companySearch"
            placeholder="Search for company..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <ul className="mt-4 space-y-2">
            {filteredCompanies.map((sme) => (
              <li key={sme.id} className="p-2 border border-gray-300 rounded-md">
                {sme.name}
              </li>
            ))}
          </ul>

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

export default Search;
