import { useState } from "react";
import { useGetProjectsQuery, useUpdateProjectMutation } from "../../../../features/projects/projectsAPI";

export default function Projects() {
    const { data: projects, isLoading, error } = useGetProjectsQuery();
    const [updateProject] = useUpdateProjectMutation();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ name: "", description: "" });

    const handleEdit = (project: any) => {
        setEditingId(project.projectid);
        setEditData({ name: project.name, description: project.description });
    };

    const handleSave = async () => {
        if (editingId) {
            await updateProject({ id: editingId, data: editData });
            setEditingId(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
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

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4 py-6">
                    <h1 className="text-3xl font-bold text-white mb-6">All Projects</h1>

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
                                                        value={editData.name}
                                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
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
                                                <h3 className="card-title text-xl mb-2">{project.name}</h3>
                                                <p className="text-white/80 mb-4">{project.description}</p>
                                                <div className="text-sm text-white/60 space-y-1 mb-4">
                                                    <p>Created by: User {project.createdby}</p>
                                                    <p>Created: {new Date(project.createdat).toLocaleDateString()}</p>
                                                </div>
                                                <div className="card-actions justify-end">
                                                    <button
                                                        onClick={() => handleEdit(project)}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
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