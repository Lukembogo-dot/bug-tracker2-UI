import { useGetUsersQuery, useDeleteUserMutation } from "../../../../features/auth/usersAPI";

export default function Users() {
    const { data: users, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users?.map((user) => (
                    <li key={user.userid}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => handleDelete(user.userid)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}