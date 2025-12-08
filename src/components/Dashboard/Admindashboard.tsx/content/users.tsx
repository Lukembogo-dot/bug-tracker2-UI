import { useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../../../../features/auth/usersAPI";
import { toast } from 'react-toastify';

export default function Users() {
    const [currentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAdmin = currentUser?.role?.toLowerCase() === 'admin';

    const { data, isLoading, error } = useGetUsersQuery();
    const users = data?.users ?? [];
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
  try {
    await deleteUser(id).unwrap();
    toast.success("User deleted successfully");
  } catch (error: any) {
    console.error("Delete user error:", error);
    toast.error("Failed to delete user");
  }
};


    if (!isAdmin) {
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="alert alert-error max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>Admin access required to view users</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="alert alert-error max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error loading users</span>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6 md:p-10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl font-bold text-white mb-6">All Users</h1>
                    <div className="overflow-x-auto">
                <table className="table w-full bg-gray-800/70 bg-gradient-to-br from-gray-800/70 to-purple-900/30 border border-purple-500/20">
                    <thead>
                        <tr className="text-white">
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr
                                key={user.userid}
                                className="hover:bg-purple-900/20 hover:shadow-lg transition-all duration-300"
                            >
                                <td className="text-white">{user.username}</td>
                                <td className="text-gray-300">{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(user.userid)}
                                        disabled={user.userid === currentUser?.userid || user.role === 'admin'}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    </div>
                </div>
            </div>
        </div>
    );
}