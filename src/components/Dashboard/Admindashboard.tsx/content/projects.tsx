 import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetProjectsQuery, useUpdateProjectMutation, useCreateProjectMutation, useDeleteProjectMutation } from "../../../../features/projects/projectsAPI";
import { useGetUsersQuery } from "../../../../features/auth/usersAPI";
import { toast } from 'react-toastify';

type ProjectFormValues = {
    projectname: string;
    description: string;
    assignedto: number;
};

export default function Projects() {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAdmin = user?.role?.toLowerCase() === 'admin';

    const { data: projects, isLoading, error } = useGetProjectsQuery();
    const { data: usersData, refetch: refetchUsers } = useGetUsersQuery();
    const users = usersData?.users || [];
    const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ projectname: "", description: "" });

    const schema = yup.object().shape({
        projectname: yup.string().required('Project name is required').min(3, 'Project name must be at least 3 characters'),
        description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
        assignedto: yup.number().required('Please select a user to assign this project to'),
    });

    const { handleSubmit, register, reset, formState: { errors } } = useForm<ProjectFormValues>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        refetchUsers();
    }, [refetchUsers]);

    const onSubmit: SubmitHandler<ProjectFormValues> = async (formData) => {
        try {
            if (!user?.userid) {
                alert('User not found. Please login again.');
                return;
            }


            await createProject({
                projectname: formData.projectname,
                description: formData.description,
                createdby: user.userid,
                assignedto: formData.assignedto,
            }).unwrap();

            reset();
        } catch (err: any) {
            alert(err.data?.message || 'Failed to create project');
        }
    };

    const handleEdit = (project: any) => {
        setEditingId(project.projectid);
        setEditData({ projectname: project.projectname, description: project.description });
    };

    const handleSave = async () => {
        if (editingId) {
            await updateProject({ id: editingId, data: { projectname: editData.projectname, description: editData.description } });
            setEditingId(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
        try {
            await deleteProject({ id, force: true }).unwrap();
            toast.success('Project deleted successfully');
        } catch (err: any) {
            toast.error(err.data?.message || 'Failed to delete project');
        }
    }
};


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
                <span>Error loading projects</span>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl font-bold text-white mb-6">All Projects</h1>

                    {/* Create Project Form - Admin Only */}
                    {isAdmin ? (
                        <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                            <div className="card-body p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="card-title text-2xl">Create New Project</h2>
                                    <button
                                        type="button"
                                        onClick={() => refetchUsers()}
                                        className="btn btn-outline btn-sm"
                                        title="Refresh users list"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh Users
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label mb-2">
                                            <span className="label-text text-white">Project Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter project name"
                                            className={`input input-bordered bg-white text-black w-full mt-2 ${errors.projectname ? 'input-error' : ''}`}
                                            {...register("projectname")}
                                        />
                                        {errors.projectname && <span className="text-error text-sm mt-1">{errors.projectname.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label mb-2">
                                            <span className="label-text text-white">Description</span>
                                        </label>
                                        <textarea
                                            className={`textarea textarea-bordered bg-white text-black w-full mt-2 h-28 ${errors.description ? 'textarea-error' : ''}`}
                                            placeholder="Project description"
                                            {...register("description")}
                                        ></textarea>
                                        {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label mb-2">
                                            <span className="label-text text-white">Assign to User</span>
                                        </label>
                                        <select
                                            className={`select select-bordered bg-white text-black w-full mt-2 ${errors.assignedto ? 'select-error' : ''}`}
                                            {...register("assignedto")}
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user.userid} value={user.userid}>
                                                    {user.username} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.assignedto && <span className="text-error text-sm mt-1">{errors.assignedto.message}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isCreating}>
                                        {isCreating ? 'Creating...' : 'Create Project'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="card bg-red-900/60 text-white shadow-xl mb-6 rounded-md">
                            <div className="card-body p-6 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2">Admin Access Required</h3>
                                <p className="text-red-200">You need administrator privileges to create projects. Please contact an administrator if you believe this is an error.</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {projects?.projects && projects.projects.length > 0 ? (
                            projects.projects.map((project) => (
                                <div key={project.projectid} className="card bg-black/60 text-white shadow-xl rounded-md hover:bg-black/70 transition-colors w-full">
                                    <div className="card-body p-6">
                                        {editingId === project.projectid ? (
                                            <div className="space-y-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-white">Project Name</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editData.projectname}
                                                        onChange={(e) => setEditData({ ...editData, projectname: e.target.value })}
                                                        placeholder="Name"
                                                        className="input input-bordered bg-white text-black w-full"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-white">Description</span>
                                                    </label>
                                                    <textarea
                                                        value={editData.description}
                                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                        placeholder="Description"
                                                        className="textarea textarea-bordered bg-white text-black w-full h-24"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={handleSave} className="btn btn-primary btn-sm">Save</button>
                                                    <button onClick={handleCancel} className="btn btn-outline btn-sm">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="card-title text-xl mb-2">{project.projectname}</h3>
                                                <p className="text-white/80 mb-4">{project.description}</p>
                                                <div className="text-sm text-white/60 space-y-1 mb-4">
                                                    <p>Created by: User {project.createdby}</p>
                                                    <p>Assigned to: User {project.assignedto}</p>
                                                    <p>Created: {new Date(project.createdat).toLocaleDateString()}</p>
                                                </div>
                                                <div className="card-actions justify-end">
                                                    <button
                                                        onClick={() => handleEdit(project)}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.projectid)}
                                                        className="btn btn-error btn-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className="card bg-black/60 text-white shadow-xl rounded-md">
                                    <div className="card-body p-6 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span className="text-white/60">No projects found</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}