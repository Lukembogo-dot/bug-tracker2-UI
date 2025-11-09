import { Navigation } from '../nav/Navigation';

export default function Projects() {
    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Projects</h1>

                {/* Add Project Form */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title">Create New Project</h2>
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Project Name</span>
                                </label>
                                <input type="text" placeholder="Enter project name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Project description"></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Start Date</span>
                                </label>
                                <input type="date" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End Date</span>
                                </label>
                                <input type="date" className="input input-bordered" />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Project</button>
                        </form>
                    </div>
                </div>

                {/* Projects List */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">All Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title">Project A</h3>
                                    <p>Description of Project A</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-sm btn-outline">View</button>
                                        <button className="btn btn-sm btn-outline">Edit</button>
                                        <button className="btn btn-sm btn-outline btn-error">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title">Project B</h3>
                                    <p>Description of Project B</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-sm btn-outline">View</button>
                                        <button className="btn btn-sm btn-outline">Edit</button>
                                        <button className="btn btn-sm btn-outline btn-error">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title">Project C</h3>
                                    <p>Description of Project C</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-sm btn-outline">View</button>
                                        <button className="btn btn-sm btn-outline">Edit</button>
                                        <button className="btn btn-sm btn-outline btn-error">Delete</button>
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