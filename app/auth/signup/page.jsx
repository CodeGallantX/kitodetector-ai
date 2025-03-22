"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const App = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    // You can add your signup logic here
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <Field type="text" name="username" className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Field type="email" name="email" className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Field type="password" name="password" className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;