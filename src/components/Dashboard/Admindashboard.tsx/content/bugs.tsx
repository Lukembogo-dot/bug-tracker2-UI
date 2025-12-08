 import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetBugsQuery, useCreateBugMutation, useUpdateBugMutation, useDeleteBugMutation } from '../../../../features/bugs/bugsAPI';
import type { TBug } from '../../../../features/bugs/bugsAPI';
import { toast } from 'react-toastify';

type BugFormValues = {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  projectid: number;
};

export default function Bugs() {
    const { data, isLoading, isError, error } = useGetBugsQuery();
    const bugs = data?.bugs;

    const [createBug, { isLoading: isCreating }] = useCreateBugMutation();
    const [updateBug] = useUpdateBugMutation();
    const [deleteBug] = useDeleteBugMutation();

    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [editingBug, setEditingBug] = useState<TBug | null>(null);
    const [viewingBug, setViewingBug] = useState<TBug | null>(null);

    const [selectedPriority, setSelectedPriority] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const schema = yup.object().shape({
      title: yup.string().required('title is required').min(3, 'title must be at least 3 characters'),
      description: yup.string().required('description is required').min(10, 'description must be at least 10 characters'),
      priority: yup.string().oneOf(['Low', 'Medium', 'High', 'Critical']).required('priority is required'),
      status: yup.string().oneOf(['Open', 'In Progress', 'Resolved', 'Closed']).required('status is required'),
      projectid: yup.number().required('Project ID is required').positive('Project ID must be positive'),
    });

    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<BugFormValues>({
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<BugFormValues> = async (formData) => {
      try {
        if (!user?.userid) {
          toast.error('User not found. Please login again.');
          return;
        }

        if (editingBug) {
          await updateBug({
            id: editingBug.bugid,
            data: {
              title: formData.title,
              description: formData.description,
              priority: formData.priority,
              status: formData.status,
              projectid: formData.projectid,
            },
          }).unwrap();
          toast.success('Bug updated successfully!');
        } else {
          await createBug({
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            projectid: formData.projectid,
            status: 'Open',
            reportedby: user.userid,
            assignedto: user.userid,
          }).unwrap();
          toast.success('Bug created successfully!');
        }

        reset();
        setEditingBug(null);
        closeModal();
      } catch (err: any) {
        toast.error(err.data?.message || `Failed to ${editingBug ? 'update' : 'create'} bug`);
      }
    };

    const openModal = (bug?: TBug) => {
      if (bug) {
        setEditingBug(bug);
        // Pre-fill form with existing data
        setValue('title', bug.title);
        setValue('description', bug.description || '');
        setValue('priority', bug.priority);
        setValue('status', bug.status);
        setValue('projectid', bug.projectid);
        setSelectedPriority(bug.priority);
        setSelectedStatus(bug.status);
      } else {
        setEditingBug(null);
        setSelectedPriority('');
        setSelectedStatus('');
      }
      (document.getElementById('admin-bug-modal') as HTMLDialogElement)?.showModal();
    };

    const openViewModal = (bug: TBug) => {
      setViewingBug(bug);
      (document.getElementById('admin-view-bug-modal') as HTMLDialogElement)?.showModal();
    };

    const closeViewModal = () => {
      setViewingBug(null);
      (document.getElementById('admin-view-bug-modal') as HTMLDialogElement)?.close();
    };

    const closeModal = () => {
      reset();
      setEditingBug(null);
      setSelectedPriority('');
      setSelectedStatus('');
      (document.getElementById('admin-bug-modal') as HTMLDialogElement)?.close();
    };

    const handleDelete = async (bugId: number) => {
      if (confirm('Are you sure you want to delete this bug? This action cannot be undone.')) {
        try {
          await deleteBug(bugId).unwrap();
          toast.success('Bug deleted successfully!');
        } catch (err: any) {
           console.log('Delete bug error:', err);
           toast.error(err.data?.message || 'Failed to delete bug');
         }
      }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles: Record<string, string> = {
            'Open': 'badge-error',
            'In Progress': 'badge-warning',
            'Resolved': 'badge-success',
            'Closed': 'badge-neutral',
        };
        return statusStyles[status] || 'badge-ghost';
    };

    const getPriorityBadge = (priority: string) => {
        const priorityStyles: Record<string, string> = {
            'Critical': 'badge-error',
            'High': 'badge-warning',
            'Medium': 'badge-info',
            'Low': 'badge-success',
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
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6 md:p-10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Bug Tracker</h1>
                    <p className="text-white/80 mt-1">Manage and track all reported bugs</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Bug
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
            <div className="flex flex-wrap gap-2 mb-8">
                <select className="select select-bordered select-sm">
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                </select>
                <select className="select select-bordered select-sm">
                    <option value="">All Priority</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input type="text" placeholder="Search bugs..." className="input input-bordered input-sm w-full max-w-xs" />
            </div>

            {/* Bugs Table */}
            <div className="overflow-x-auto bg-black/60 rounded-box mb-8">
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
                                            <button className="btn btn-ghost btn-xs" title="View" onClick={() => openViewModal(bug)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-ghost btn-xs" title="Edit" onClick={() => openModal(bug)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-ghost btn-xs text-error" title="Delete" onClick={() => handleDelete(bug.bugid)}>
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

            {/* Bug Creation/Edit Modal */}
            <dialog id="admin-bug-modal" className="modal z-50">
                <div className="modal-box bg-white/95 backdrop-blur-sm max-w-md border-2 border-gray-300 shadow-2xl relative z-50 overflow-visible">
                    <h3 className="font-bold text-lg mb-4">{editingBug ? 'Edit Bug' : 'Report a New Bug'}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Bug title"
                                className={`input input-bordered w-full border-2 border-gray-300 focus:border-blue-500 ${errors.title ? 'input-error border-red-500' : ''}`}
                                {...register("title")}
                            />
                            {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                className={`textarea textarea-bordered w-full h-24 border-2 border-gray-300 focus:border-blue-500 ${errors.description ? 'textarea-error border-red-500' : ''}`}
                                placeholder="Describe the bug"
                                {...register("description")}
                            ></textarea>
                            {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Priority</span>
                            </label>
                            <div className="dropdown w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`btn w-full border-2 border-gray-300 focus:border-blue-500 ${errors.priority ? 'border-red-500' : ''}`}
                                >
                                    {selectedPriority || 'Select priority'}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-black text-white rounded-box z-[1] w-full p-2 shadow">
                                    <li><a onClick={() => { setSelectedPriority('Low'); setValue('priority', 'Low'); }}>Low</a></li>
                                    <li><a onClick={() => { setSelectedPriority('Medium'); setValue('priority', 'Medium'); }}>Medium</a></li>
                                    <li><a onClick={() => { setSelectedPriority('High'); setValue('priority', 'High'); }}>High</a></li>
                                    <li><a onClick={() => { setSelectedPriority('Critical'); setValue('priority', 'Critical'); }}>Critical</a></li>
                                </ul>
                            </div>
                            <input type="hidden" {...register("priority")} />
                            {errors.priority && <span className="text-error text-sm mt-1">{errors.priority.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Status</span>
                            </label>
                            <div className="dropdown w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`btn w-full border-2 border-gray-300 focus:border-blue-500 ${errors.status ? 'border-red-500' : ''}`}
                                >
                                    {selectedStatus || 'Select status'}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-black text-white rounded-box z-[1] w-full p-2 shadow">
                                    <li><a onClick={() => { setSelectedStatus('Open'); setValue('status', 'Open'); }}>Open</a></li>
                                    <li><a onClick={() => { setSelectedStatus('In Progress'); setValue('status', 'In Progress'); }}>In Progress</a></li>
                                    <li><a onClick={() => { setSelectedStatus('Resolved'); setValue('status', 'Resolved'); }}>Resolved</a></li>
                                    <li><a onClick={() => { setSelectedStatus('Closed'); setValue('status', 'Closed'); }}>Closed</a></li>
                                </ul>
                            </div>
                            <input type="hidden" {...register("status")} />
                            {errors.status && <span className="text-error text-sm mt-1">{errors.status.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Project ID</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Project ID"
                                className={`input input-bordered w-full border-2 border-gray-300 focus:border-blue-500 ${errors.projectid ? 'input-error border-red-500' : ''}`}
                                {...register("projectid")}
                            />
                            {errors.projectid && <span className="text-error text-sm mt-1">{errors.projectid.message}</span>}
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn border-2 border-gray-300 hover:border-gray-400" onClick={closeModal}>Cancel</button>
                            <button type="submit" className="btn btn-primary border-2 border-blue-600" disabled={isCreating}>
                                {isCreating ? (editingBug ? 'Updating...' : 'Creating...') : (editingBug ? 'Update Bug' : 'Create Bug')}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Bug View Modal */}
            <dialog id="admin-view-bug-modal" className="modal z-50">
                <div className="modal-box bg-white/95 backdrop-blur-sm max-w-md border-2 border-gray-300 shadow-2xl relative z-50 overflow-visible">
                    <h3 className="font-bold text-lg mb-4">Bug Details</h3>
                    {viewingBug && (
                        <div className="space-y-4">
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Bug ID</span>
                                </label>
                                <p className="text-sm">#{viewingBug.bugid}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Title</span>
                                </label>
                                <p className="text-sm">{viewingBug.title}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Description</span>
                                </label>
                                <p className="text-sm">{viewingBug.description || 'No description'}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Priority</span>
                                </label>
                                <p className="text-sm">{viewingBug.priority}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Status</span>
                                </label>
                                <p className="text-sm">{viewingBug.status}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Project ID</span>
                                </label>
                                <p className="text-sm">{viewingBug.projectid}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Reported By</span>
                                </label>
                                <p className="text-sm">User ID: {viewingBug.reportedby || 'N/A'}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 pb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Assigned To</span>
                                </label>
                                <p className="text-sm">User ID: {viewingBug.assignedto || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Created At</span>
                                </label>
                                <p className="text-sm">{formatDate(viewingBug.createdat)}</p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <button type="button" className="btn border-2 border-gray-300 hover:border-gray-400" onClick={closeViewModal}>Close</button>
                    </div>
                </div>
            </dialog>
                </div>
            </div>
        </div>
    );
}

