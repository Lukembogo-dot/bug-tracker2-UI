export default function Bugs() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Bugs</h1>

                    {/* Hero Image */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                        <div className="card-body p-6">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src="https://www.beningo.com/wp-content/uploads/2016/03/AdobeStock_100096286.jpeg" className="max-w-sm rounded-lg shadow-2xl" alt="Bug tracking illustration" />
                                <div>
                                    <h1 className="text-4xl font-bold">Track & Manage Bugs</h1>
                                    <p className="py-6">Report, track, and resolve bugs efficiently with our comprehensive bug tracking system.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Bug Form */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">Report a Bug</h2>
                            <form className="space-y-4">
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Title</span>
                                    </label>
                                    <input type="text" placeholder="Bug title" className="input input-bordered bg-white text-black w-full mt-2" />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Description</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered bg-white text-black w-full mt-2 h-28" placeholder="Describe the bug"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Severity</span>
                                    </label>
                                    <select className="select select-bordered bg-white text-black w-full mt-2">
                                        <option disabled selected>Select severity</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Project</span>
                                    </label>
                                    <select className="select select-bordered bg-white text-black w-full mt-2">
                                        <option disabled selected>Select project</option>
                                        <option>Project A</option>
                                        <option>Project B</option>
                                        <option>Project C</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Bug</button>
                            </form>
                        </div>
                    </div>

                    {/* Bugs List */}
                    <div className="card bg-black/60 text-white shadow-xl rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">Reported Bugs</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="text-white">ID</th>
                                            <th className="text-white">Title</th>
                                            <th className="text-white">Severity</th>
                                            <th className="text-white">Status</th>
                                            <th className="text-white">Project</th>
                                            <th className="text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="text-white">1</th>
                                            <td className="text-white">UI Bug</td>
                                            <td><span className="badge badge-warning">Medium</span></td>
                                            <td><span className="badge badge-info">Open</span></td>
                                            <td className="text-white">Project A</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline">Edit</button>
                                                <button className="btn btn-sm btn-outline btn-error ml-2">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-white">2</th>
                                            <td className="text-white">API Error</td>
                                            <td><span className="badge badge-error">High</span></td>
                                            <td><span className="badge badge-success">Closed</span></td>
                                            <td className="text-white">Project B</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline">Edit</button>
                                                <button className="btn btn-sm btn-outline btn-error ml-2">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}