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

    if (isLoading) return <div>Loading projects...</div>;
    if (error) return <div>Error loading projects</div>;

    return (
        <div>
            <h1>All Projects</h1>
            <ul>
                {projects?.projects?.map((project) => (
                    <li key={project.projectid}>
                        {editingId === project.projectid ? (
                            <div>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    placeholder="Name"
                                />
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    placeholder="Description"
                                />
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <p>Created by: {project.createdby}</p>
                                <p>Created: {new Date(project.createdat).toLocaleString()}</p>
                                <button onClick={() => handleEdit(project)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}