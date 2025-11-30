import { useGetUsersQuery, useDeleteUserMutation } from "../../../../features/auth/usersAPI";

export default function Users() {
    const { data, isLoading, error } = useGetUsersQuery();
    const users = data?.users ?? [];
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">All Users</h1>
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
    );
}