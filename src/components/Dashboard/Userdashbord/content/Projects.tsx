import { useState } from 'react';
import { useGetProjectsByAssignedUserQuery } from '../../../../features/projects/projectsAPI';
import type { TProject } from '../../../../features/projects/projectsAPI';

export default function Projects() {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const { data, isLoading, error } = useGetProjectsByAssignedUserQuery(user?.userid || 0);
    const projects = data?.projects || [];

    const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

    const handleViewProject = (project: TProject) => {
        setSelectedProject(project);
        (document.getElementById('project-modal') as HTMLDialogElement)?.showModal();
    };

    const closeModal = () => {
        setSelectedProject(null);
        (document.getElementById('project-modal') as HTMLDialogElement)?.close();
    };
   if(error){
    console.log("error",error);
   }

   if(isLoading){
    console.log("loading...");
   }
   else{
    console.log(data)
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
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">My Projects</h1>

                    {/* Projects List */}
                    <div className="card bg-black/60 text-white shadow-xl rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">Projects Assigned to Me</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="text-white">ID</th>
                                            <th className="text-white">Project Name</th>
                                            <th className="text-white">Description</th>
                                            <th className="text-white">Created By</th>
                                            <th className="text-white">Created Date</th>
                                            <th className="text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading?"Loading Projects":(
                                            (projects.length > 0 ? (
                                            projects.map((project) => (
                                                <tr key={project.projectid}>
                                                    <th className="text-white">#{project.projectid}</th>
                                                    <td className="text-white font-medium">{project.projectname}</td>
                                                    <td className="text-white max-w-xs truncate">{project.description}</td>
                                                    <td className="text-white">User {project.createdby}</td>
                                                    <td className="text-white">{new Date(project.createdat).toLocaleDateString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline"
                                                            onClick={() => handleViewProject(project)}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    <span className="text-white/60">No projects assigned to you yet.</span>
                                                </td>
                                            </tr>
                                        ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Project Details Modal */}
                    <dialog id="project-modal" className="modal">
                        <div className="modal-box bg-white/95 backdrop-blur-sm">
                            <h3 className="font-bold text-lg">Project Details</h3>
                            {selectedProject && (
                                <div className="py-4 space-y-3">
                                    <div>
                                        <strong>Project ID:</strong> #{selectedProject.projectid}
                                    </div>
                                    <div>
                                        <strong>Project Name:</strong> {selectedProject.projectname}
                                    </div>
                                    <div>
                                        <strong>Description:</strong>
                                        <p className="mt-1">{selectedProject.description}</p>
                                    </div>
                                    <div>
                                        <strong>Created By:</strong> User {selectedProject.createdby}
                                    </div>
                                    <div>
                                        <strong>Assigned To:</strong> User {selectedProject.assignedto}
                                    </div>
                                    <div>
                                        <strong>Created Date:</strong> {new Date(selectedProject.createdat).toLocaleString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated:</strong> {new Date(selectedProject.updatedat).toLocaleString()}
                                    </div>
                                </div>
                            )}
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={closeModal}>Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
}