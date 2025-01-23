import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaHome, FaDollarSign, FaRuler, FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';

const PropertySchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  price: Yup.number().positive('Must be positive').required('Required'),
  address: Yup.string().required('Required'),
  bedrooms: Yup.number().positive('Must be positive').integer('Must be an integer').required('Required'),
  bathrooms: Yup.number().positive('Must be positive').required('Required'),
  area: Yup.number().positive('Must be positive').required('Required'),
  description: Yup.string().required('Required'),
});

const UploadProperty = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Here you would typically make an API call to upload the property
    console.log('Property upload', values);
    // Simulating an API call
    setTimeout(() => {
      alert('Property uploaded successfully!');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Property</h2>
      <Formik
        initialValues={{
          title: '',
          price: '',
          address: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          description: '',
        }}
        validationSchema={PropertySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <div className="flex items-center border rounded-md">
                <FaHome className="text-gray-400 ml-2" />
                <Field
                  type="text"
                  name="title"
                  placeholder="Property Title"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <div className="flex items-center border rounded-md">
                <FaDollarSign className="text-gray-400 ml-2" />
                <Field
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <div className="flex items-center border rounded-md">
                <FaMapMarkerAlt className="text-gray-400 ml-2" />
                <Field
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="flex items-center border rounded-md">
                  <FaBed className="text-gray-400 ml-2" />
                  <Field
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    className="w-full p-2 outline-none"
                  />
                </div>
                <ErrorMessage name="bedrooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex-1">
                <div className="flex items-center border rounded-md">
                  <FaBath className="text-gray-400 ml-2" />
                  <Field
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="w-full p-2 outline-none"
                  />
                </div>
                <ErrorMessage name="bathrooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center border rounded-md">
                <FaRuler className="text-gray-400 ml-2" />
                <Field
                  type="number"
                  name="area"
                  placeholder="Area (sq ft)"
                  className="w-full p-2 outline-none"
                />
              </div>
              <ErrorMessage name="area" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Property Description"
                className="w-full p-2 border rounded-md outline-none"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Property'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadProperty;

