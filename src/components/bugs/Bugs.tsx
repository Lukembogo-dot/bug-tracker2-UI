import { Navigation } from '../nav/Navigation';

export default function Bugs() {
    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Bugs</h1>

                {/* Hero Image */}
                <div className="hero bg-base-200 rounded-box mb-6">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src="/src/assets/MIT-Auto-bug.jpg" className="max-w-sm rounded-lg shadow-2xl" alt="Bug tracking illustration" />
                        <div>
                            <h1 className="text-5xl font-bold">Track & Manage Bugs</h1>
                            <p className="py-6">Report, track, and resolve bugs efficiently with our comprehensive bug tracking system.</p>
                        </div>
                    </div>
                </div>

                {/* Add Bug Form */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title">Report a Bug</h2>
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" placeholder="Bug title" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Describe the bug"></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Severity</span>
                                </label>
                                <select className="select select-bordered">
                                    <option disabled selected>Select severity</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Project</span>
                                </label>
                                <select className="select select-bordered">
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
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Reported Bugs</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Severity</th>
                                        <th>Status</th>
                                        <th>Project</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>UI Bug</td>
                                        <td><span className="badge badge-warning">Medium</span></td>
                                        <td><span className="badge badge-info">Open</span></td>
                                        <td>Project A</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline">Edit</button>
                                            <button className="btn btn-sm btn-outline btn-error ml-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>API Error</td>
                                        <td><span className="badge badge-error">High</span></td>
                                        <td><span className="badge badge-success">Closed</span></td>
                                        <td>Project B</td>
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
    );
}