export default function Projects() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Projects</h1>

                    {/* Add Project Form */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">Create New Project</h2>
                            <form className="space-y-4">
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Project Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter project name" className="input input-bordered bg-white text-black w-full mt-2" />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Description</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered bg-white text-black w-full mt-2 h-28" placeholder="Project description"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Start Date</span>
                                    </label>
                                    <input type="date" className="input input-bordered bg-white text-black w-full mt-2" />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">End Date</span>
                                    </label>
                                    <input type="date" className="input input-bordered bg-white text-black w-full mt-2" />
                                </div>
                                <button type="submit" className="btn btn-primary">Create Project</button>
                            </form>
                        </div>
                    </div>

                    {/* Projects List */}
                    <div className="card bg-black/60 text-white shadow-xl rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">All Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="card bg-white/10 text-white">
                                    <div className="card-body">
                                        <h3 className="card-title text-xl">Project A</h3>
                                        <p>Description of Project A</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-sm btn-outline">View</button>
                                            <button className="btn btn-sm btn-outline">Edit</button>
                                            <button className="btn btn-sm btn-outline btn-error">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-white/10 text-white">
                                    <div className="card-body">
                                        <h3 className="card-title text-xl">Project B</h3>
                                        <p>Description of Project B</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-sm btn-outline">View</button>
                                            <button className="btn btn-sm btn-outline">Edit</button>
                                            <button className="btn btn-sm btn-outline btn-error">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-white/10 text-white">
                                    <div className="card-body">
                                        <h3 className="card-title text-xl">Project C</h3>
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
        </div>
    );
}