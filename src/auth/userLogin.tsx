import { Navigation } from "../components/nav/Navigation";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; //validator
import { useState } from 'react';
import { useLoginMutation } from '../features/auth/usersAPI';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type FormValues = {
  email: string;
  password: string;
};

const UserLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  });

  const { handleSubmit, register } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await login(data).unwrap();
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      toast.success('Login successful!');
      // Navigate based on user role
      if (result.user.role?.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err: any) {
      setError(err.data?.message || 'Login failed');
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
            <h2 className="card-title justify-center text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-white text-black w-full"
                  required
                  {...register("password")}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserLogin;