import React, { useState } from "react";

const stats = [
  { number: "75000 +", label: "Happy Customers" },
  { number: "3500 +", label: "Designs" },
  { number: "40", label: "Experience" },
  { number: "4", label: "Cities" },
];

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsappUpdates: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message || "Form submitted successfully!");
          // Reset the form
          setFormData({
            name: "",
            phone: "",
            whatsappUpdates: false,
          });
        } else {
          const error = await response.json();
          alert(error.error || "Form submission failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while submitting the form");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url("/public/bg-image.png")`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Login Card */}
        <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Designs for Every Budget
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
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
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="whatsappUpdates"
                name="whatsappUpdates"
                checked={formData.whatsappUpdates}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="whatsappUpdates"
                className="ml-2 block text-sm text-gray-900"
              >
                Send me updates via WhatsApp
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md"
            >
              Get a free Quote
            </button>
          </form>
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
        <div className="container mx-auto text-center space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="✨" title="Personalized designs" />
            <FeatureCard icon="🏠" title="Flat 10-year warranty" />
            <FeatureCard icon="💰" title="Transparent pricing" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold">{stat.number}</div>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    </div>
  );
}
