import { useGetBugsQuery } from '../../../../features/bugs/bugsAPI';

export default function Bugs() {
    const { data, isLoading, isError, error } = useGetBugsQuery();
    const bugs = data?.bugs;

    const getStatusBadge = (status: string) => {
        const statusStyles: Record<string, string> = {
            'open': 'badge-error',
            'in-progress': 'badge-warning',
            'resolved': 'badge-success',
            'closed': 'badge-neutral',
        };
        return statusStyles[status] || 'badge-ghost';
    };

    const getPriorityBadge = (priority: string) => {
        const priorityStyles: Record<string, string> = {
            'critical': 'badge-error',
            'high': 'badge-warning',
            'medium': 'badge-info',
            'low': 'badge-success',
        };
        return priorityStyles[priority] || 'badge-ghost';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error loading bugs: {error?.toString()}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Bug Tracker</h1>
                    <p className="text-white/80 mt-1">Manage and track all reported bugs</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <button className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Bug
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="stat bg-black/60 text-white rounded-box hover:bg-black/70 transition-colors">
                    <div className="stat-figure text-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title text-white/80">Open</div>
                    <div className="stat-value text-error">{bugs?.filter(b => b.status === 'Open').length || 0}</div>
                </div>
                <div className="stat bg-black/60 text-white rounded-box hover:bg-black/70 transition-colors">
                    <div className="stat-figure text-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="stat-title text-white/80">In Progress</div>
                    <div className="stat-value text-warning">{bugs?.filter(b => b.status === 'In Progress').length || 0}</div>
                </div>
                <div className="stat bg-black/60 text-white rounded-box hover:bg-black/70 transition-colors">
                    <div className="stat-figure text-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title text-white/80">Resolved</div>
                    <div className="stat-value text-success">{bugs?.filter(b => b.status === 'Resolved').length || 0}</div>
                </div>
                <div className="stat bg-black/60 text-white rounded-box hover:bg-black/70 transition-colors">
                    <div className="stat-figure text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div className="stat-title text-white/80">Total Bugs</div>
                    <div className="stat-value text-white">{bugs?.length || 0}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                <select className="select select-bordered select-sm">
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
                <select className="select select-bordered select-sm">
                    <option value="">All Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <input type="text" placeholder="Search bugs..." className="input input-bordered input-sm w-full max-w-xs" />
            </div>

            {/* Bugs Table */}
            <div className="overflow-x-auto bg-black/60 rounded-box">
                <table className="table table-zebra text-white">
                    <thead>
                        <tr>
                            <th className="text-white">ID</th>
                            <th className="text-white">Title</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Priority</th>
                            <th className="text-white">Created</th>
                            <th className="text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs && bugs.length > 0 ? (
                            bugs.map((bug) => (
                                <tr key={bug.bugid} className="hover">
                                    <td className="font-mono text-sm text-white">#{bug.bugid}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{bug.title}</span>
                                            <span className="text-sm text-white/60 truncate max-w-xs">
                                                {bug.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(bug.status)} badge-sm`}>
                                            {bug.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getPriorityBadge(bug.priority)} badge-sm`}>
                                            {bug.priority}
                                        </span>
                                    </td>
                                    <td className="text-sm text-white">{formatDate(bug.createdat)}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="btn btn-ghost btn-xs" title="View">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-ghost btn-xs" title="Edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-ghost btn-xs text-error" title="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-white/60">No bugs found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {bugs && bugs.length > 0 && (
                <div className="flex justify-center mt-6">
                    <div className="join">
                        <button className="join-item btn btn-sm">«</button>
                        <button className="join-item btn btn-sm btn-active">1</button>
                        <button className="join-item btn btn-sm">2</button>
                        <button className="join-item btn btn-sm">3</button>
                        <button className="join-item btn btn-sm">»</button>
                    </div>
                </div>
            )}
                </div>
            </div>
        </div>
    );
}