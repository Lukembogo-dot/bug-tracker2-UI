import { Navigation } from "../components/nav/Navigation";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useCreateUsersMutation } from '../features/auth/usersAPI';
import { useNavigate } from 'react-router';



type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Registration: React.FC = () => {
  const [createUser, { isLoading }] = useCreateUsersMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const schema = yup.object().shape({
    username: yup.string().min(3, 'Min 3 characters').max(100, 'Max 100 characters').required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setError(null);
      setSuccess(null);
      const { confirmPassword, ...userData } = data;
      await createUser(userData).unwrap();
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/userLogin'), 2000);
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* Navigation */}
      <div className="relative z-20">
        <Navigation />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="card w-96 bg-black/60 text-white shadow-xl rounded-md">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Username</span>
                </label>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Enter your username"
                  className="input input-bordered bg-white text-black w-full"
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email"
                  className="input input-bordered bg-white text-black w-full"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="input input-bordered bg-white text-black w-full"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Confirm your password"
                  className="input input-bordered bg-white text-black w-full"
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-4">
                <span>{success}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;