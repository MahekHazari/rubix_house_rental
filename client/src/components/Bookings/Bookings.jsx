import React, { useState, useEffect } from 'react';
import { FaCalendar, FaClock, FaUser, FaHome } from 'react-icons/fa';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Here you would typically fetch bookings from an API
    // For this example, we'll use mock data
    const mockBookings = [
      { id: 1, clientName: 'Alice Johnson', propertyName: 'Sunset Villa', date: '2023-06-15', time: '14:00' },
      { id: 2, clientName: 'Bob Smith', propertyName: 'Ocean View Condo', date: '2023-06-16', time: '10:30' },
      { id: 3, clientName: 'Charlie Brown', propertyName: 'Mountain Retreat', date: '2023-06-17', time: '15:45' },
    ];
    setBookings(mockBookings);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bookings</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaHome className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">{booking.propertyName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaCalendar className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">{booking.date}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

