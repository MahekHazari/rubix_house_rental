import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

// Main Component
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url("hero-image.png")`, // Replace this URL with your image path
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Login Card */}
        <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Designs for Every Budget
          </h2>
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {/* WhatsApp Updates Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="whatsappUpdates"
                name="whatsappUpdates"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label
                htmlFor="whatsappUpdates"
                className="ml-2 block text-sm text-gray-900"
              >
                Send me updates via WhatsApp
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md"
            >
              Get Free Quote
            </button>
          </form>
          {/* Privacy and Terms */}
          <p className="text-xs text-gray-600 mt-4 text-center">
            By submitting this form, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="✨" title="Personalized designs" />
            <FeatureCard icon="🏠" title="Flat 10-year warranty" />
            <FeatureCard icon="💰" title="Transparent pricing" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title }) {
  return (
    <div className="flex flex-col items-center space-y-2 bg-white shadow-md p-4 rounded-lg">
      <div className="text-4xl">{icon}</div>
      <h4 className="text-lg font-medium text-gray-800">{title}</h4>
    </div>
  );
}
