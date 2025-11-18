import { Navigation as Navbar } from "../../components/nav/Navigation"
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; //validator
type FormValues = {
  username: string;
  password: string;
};

const UserLogin = () => {
  const schema = yup.object().shape({
    username: yup.string().min(3, 'Min 3 characters').matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').min(3, 'Min 3 characters').max(100, 'Max 100 characters').required('Invalid username').max(100, 'Max 100 characters').required('Username is required'),
    password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  });

  const { handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
   <>
    <Navbar />
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
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};


export default UserLogin;