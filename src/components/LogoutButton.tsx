import { toast } from 'react-toastify';

export default function LogoutButton() {
  const token = localStorage.getItem('token');
  const isOnDashboard = window.location.pathname.includes('/dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    window.location.href = '/';
  };

  if (!token || !isOnDashboard) return null;

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 btn btn-error z-50"
    >
      Logout
    </button>
  );
}