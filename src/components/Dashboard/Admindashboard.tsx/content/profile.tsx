import { useState } from 'react';
import { useGetBugsQuery } from '../../../../features/bugs/bugsAPI';
import { useGetUsersQuery } from '../../../../features/auth/usersAPI';
import { useGetProjectsQuery } from '../../../../features/projects/projectsAPI';
import { toast } from 'react-toastify';

interface AdminProfileProps {
    onNavigate?: (view: "profile" | "comments" | "bugs" | "projects" | "users") => void;
}

export default function AdminProfile({ onNavigate }: AdminProfileProps) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        avatar: user?.avatar || user?.username?.charAt(0).toUpperCase() || 'A',
    });

    const { data: bugsData } = useGetBugsQuery();
    const { data: usersData } = useGetUsersQuery();
    const { data: projectsData } = useGetProjectsQuery();

    const totalBugs = bugsData?.bugs?.length || 0;
    const totalUsers = usersData?.users?.length || 0;
    const totalProjects = projectsData?.projects?.length || 0;

    if (!user) {
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="alert alert-error max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Please login to view your profile</span>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({
            username: user?.username || '',
            email: user?.email || '',
            avatar: user?.avatar || user?.username?.charAt(0).toUpperCase() || 'A',
        });
    };

    const handleSave = () => {
        if (!user) return;
        const newUser = { ...user, username: editData.username, email: editData.email, avatar: editData.avatar };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsEditing(false);
        toast.success('Profile updated successfully!');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6 md:p-10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Profile</h1>

                    {/* Profile Card */}
                    <div className="card bg-black/60 text-white shadow-xl mb-8 rounded-md">
                        <div className="card-body p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="avatar">
                                    <div className="w-24 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-center text-white">
                                            {isEditing ? editData.avatar : (user.avatar || user.username?.charAt(0).toUpperCase() || 'A')}
                                        </span>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <div className="w-full space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white">Username</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.username}
                                                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                                className="input input-bordered bg-white text-black w-full"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                className="input input-bordered bg-white text-black w-full"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-white">Avatar Initial</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.avatar}
                                                onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                                                className="input input-bordered bg-white text-black w-full"
                                                maxLength={1}
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleSave}
                                                className="btn btn-primary"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="btn btn-secondary"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <h2 className="card-title text-2xl text-center">{user.username}</h2>
                                        <div className="badge badge-error">{user.role}</div>
                                        <p className="text-lg opacity-90">{user.email}</p>
                                        <p className="text-sm opacity-75">Administrator since {formatDate(user.createdat)}</p>
                                        <button
                                            onClick={handleEdit}
                                            className="btn btn-outline btn-error mt-4"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Admin Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body text-center">
                                <div className="text-3xl font-bold text-blue-400">{totalProjects}</div>
                                <div className="text-sm opacity-75">Total Projects</div>
                            </div>
                        </div>
                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body text-center">
                                <div className="text-3xl font-bold text-green-400">{totalBugs}</div>
                                <div className="text-sm opacity-75">Total Bugs</div>
                            </div>
                        </div>
                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body text-center">
                                <div className="text-3xl font-bold text-purple-400">{totalUsers}</div>
                                <div className="text-sm opacity-75">Total Users</div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4">Administrator Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Admin ID:</span>
                                        <span className="font-mono">#{user.userid}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Username:</span>
                                        <span>{user.username}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Email:</span>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Role:</span>
                                        <span className="badge badge-error badge-sm">{user.role}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Access Level:</span>
                                        <span className="badge badge-warning badge-sm">Full Access</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4">System Overview</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Joined:</span>
                                        <span>{formatDate(user.createdat)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Last Login:</span>
                                        <span>Today</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">Status:</span>
                                        <span className="badge badge-success badge-sm">Active</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-75">System Health:</span>
                                        <span className="badge badge-success badge-sm">Good</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="card bg-black/60 text-white shadow-xl mt-8">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4">Quick Admin Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    className="btn btn-outline btn-primary"
                                    onClick={() => onNavigate?.('projects')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Project
                                </button>
                                <button
                                    className="btn btn-outline btn-secondary"
                                    onClick={() => onNavigate?.('users')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Manage Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}