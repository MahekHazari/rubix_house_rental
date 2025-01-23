import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const Leads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Here you would typically fetch leads from an API
    // For this example, we'll use mock data
    const mockLeads = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', property: 'Sunset Villa' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', property: 'Ocean View Condo' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555', property: 'Mountain Retreat' },
    ];
    setLeads(mockLeads);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Leads</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{lead.property}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;

