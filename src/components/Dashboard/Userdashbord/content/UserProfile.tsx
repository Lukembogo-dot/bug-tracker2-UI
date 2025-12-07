import { useState } from 'react';
import { useUpdateUserMutation } from '../../../../features/auth/usersAPI';
import { toast } from 'react-toastify';

export default function UserProfile() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        avatar: user?.avatar || user?.username?.charAt(0).toUpperCase() || 'U',
    });
    const [, { isLoading: isUpdating }] = useUpdateUserMutation();

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
            avatar: user?.avatar || user?.username?.charAt(0).toUpperCase() || 'U',
        });
    };

    const handleSave = async () => {
        if (!user) return;
        // Since backend doesn't support update, update locally only
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
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">My Profile</h1>

                    {/* Profile Card */}
                    <div className="card bg-black/60 text-white shadow-xl mb-8 rounded-md">
                        <div className="card-body p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="avatar">
                                    <div className="w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-center text-white">
                                            {isEditing ? editData.avatar : (user.avatar || user.username?.charAt(0).toUpperCase() || 'U')}
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
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? 'Saving...' : 'Save'}
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
                                        <div className="badge badge-primary">{user.role}</div>
                                        <p className="text-lg opacity-90">{user.email}</p>
                                        <p className="text-sm opacity-75">Member since {formatDate(user.createdat)}</p>
                                        <button
                                            onClick={handleEdit}
                                            className="btn btn-outline btn-primary mt-4"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4">Account Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="opacity-75">User ID:</span>
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
                                        <span className="badge badge-primary badge-sm">{user.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-black/60 text-white shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4">Activity Summary</h3>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}