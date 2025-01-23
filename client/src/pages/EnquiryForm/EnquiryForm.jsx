'use client'

import { useState } from 'react'

// Input Component
function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

// Select Component
function Select({ label, options, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

// Radio Group Component
function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Checkbox Component
function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center mb-4">
      <input
        type="checkbox"
        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
        {...props}
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  )
}

// Main Enquiry Form Component
export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    propertySize: '',
    budget: '',
    requirements: [],
    timeline: '',
    whatsappUpdates: false
  })

  const [errors, setErrors] = useState({})

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'Independent House' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Office Space' }
  ]

  const propertySizes = [
    { value: 'below-1000', label: 'Below 1000 sq.ft' },
    { value: '1000-2000', label: '1000-2000 sq.ft' },
    { value: '2000-3000', label: '2000-3000 sq.ft' },
    { value: 'above-3000', label: 'Above 3000 sq.ft' }
  ]

  const budgetRanges = [
    { value: 'below-10l', label: 'Below 10 Lakhs' },
    { value: '10l-20l', label: '10-20 Lakhs' },
    { value: '20l-30l', label: '20-30 Lakhs' },
    { value: 'above-30l', label: 'Above 30 Lakhs' }
  ]

  const requirementOptions = [
    { value: 'full-home', label: 'Full Home Interior' },
    { value: 'kitchen', label: 'Modular Kitchen' },
    { value: 'wardrobe', label: 'Wardrobes' },
    { value: 'living', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'bathroom', label: 'Bathroom' }
  ]

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: '3-months', label: 'Within 3 months' },
    { value: '6-months', label: 'Within 6 months' },
    { value: 'planning', label: 'Just planning' }
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required'
    if (!formData.propertySize) newErrors.propertySize = 'Property size is required'
    if (!formData.budget) newErrors.budget = 'Budget range is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          // Reset the form
          setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
            propertyType: "",
            propertySize: "",
            budget: "",
            requirements: [],
            timeline: "",
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

  const handleRequirementChange = (value) => {
    const requirements = [...formData.requirements]
    const index = requirements.indexOf(value)
    if (index === -1) {
      requirements.push(value)
    } else {
      requirements.splice(index, 1)
    }
    setFormData({ ...formData, requirements })
  }

  return (
    <section className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url("/public/enquiry-form.png")`, // Replace with actual image URL
        }}>
   
        
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 margin-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Get Free Quote</h2>
          <p className="mt-2 text-gray-600">
            Fill in your details and requirements for a personalized interior design quote
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="Enter your name"
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              placeholder="Enter your phone number"
            />

            <Input
              label="City"
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              error={errors.city}
              placeholder="Enter your city"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
              label="Property Type"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              options={propertyTypes}
              error={errors.propertyType}
            />

            <Select
              label="Property Size"
              value={formData.propertySize}
              onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
              options={propertySizes}
              error={errors.propertySize}
            />
          </div>

          <Select
            label="Budget Range"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            options={budgetRanges}
            error={errors.budget}
          />

          <div className="space-y-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Requirements
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirementOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={formData.requirements.includes(option.value)}
                  onChange={() => handleRequirementChange(option.value)}
                />
              ))}
            </div>
          </div>

          <RadioGroup
            label="Timeline"
            options={timelineOptions}
            value={formData.timeline}
            onChange={(value) => setFormData({ ...formData, timeline: value })}
          />

          <Checkbox
            label="Get updates on WhatsApp"
            checked={formData.whatsappUpdates}
            onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Get Free Quote
          </button>
        </form>
      </div>
     
    
    </section>
  )
}

