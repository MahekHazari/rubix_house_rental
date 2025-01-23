import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUpload, FaUsers, FaSignOutAlt, FaCalendar, FaHeart } from 'react-icons/fa';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Agent Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link to="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FaHome className="mr-2" /> Dashboard
          </Link>
          <Link to="/upload-property" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FaUpload className="mr-2" /> Upload Property
          </Link>
          <Link to="/leads" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FaUsers className="mr-2" /> Leads
          </Link>
          <Link to="/bookings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FaCalendar className="mr-2" /> Bookings
          </Link>
          <Link to="/favorites" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 flex items-center">
            <FaHeart className="mr-2" /> Favorites
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, Agent</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Properties Listed</h2>
            <p className="text-3xl font-bold text-blue-500">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Leads</h2>
            <p className="text-3xl font-bold text-green-500">48</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
            <p className="text-3xl font-bold text-purple-500">8.5%</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
s