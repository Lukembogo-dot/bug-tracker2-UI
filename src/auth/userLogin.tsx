import { Navigation } from "../components/nav/Navigation";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; //validator
import React, { useState } from 'react';

type FormValues = {
  username: string;
  password: string;
};

const UserLogin = () => {
  const [showToast, setShowToast] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const schema = yup.object().shape({
    username: yup.string().min(3, 'Min 3 characters').matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').min(3, 'Min 3 characters').max(100, 'Max 100 characters').required('Invalid username').max(100, 'Max 100 characters').required('Username is required'),
    password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  });

  const { handleSubmit, register } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setShowToast(true);
    setSubmittedData(data);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full"
                  required
                  {...register("username")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                  {...register("password")}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>
            {/* Toast message */}
            {showToast && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>Login successful!</span>
                </div>
              </div>
            )}
            {/* Show submitted data for debugging */}
            {submittedData && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <div className="text-xs text-gray-700">Submitted Data:</div>
                <pre className="text-xs text-gray-800">{JSON.stringify(submittedData, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default UserLogin;