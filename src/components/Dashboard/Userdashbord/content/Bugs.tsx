import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetBugsByAssignedUserQuery, useCreateBugMutation, useUpdateBugMutation, useDeleteBugMutation } from '../../../../features/bugs/bugsAPI';


type BugFormValues = {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  projectid: number;
};

export default function Bugs() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { data, isLoading, error } = useGetBugsByAssignedUserQuery(user?.userid || 0);
  const bugs = data?.bugs || [];
  console.log(bugs);
  const [createBug, { isLoading: isCreating }] = useCreateBugMutation();
  const [updateBug] = useUpdateBugMutation();
  const [deleteBug] = useDeleteBugMutation();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingBug, setEditingBug] = useState<number | null>(null);

  const schema = yup.object().shape({
    title: yup.string().required('title is required').min(3, 'title must be at least 3 characters'),
    description: yup.string().required('description is required').min(10, 'description must be at least 10 characters'),
    priority: yup.string().oneOf(['Low', 'Medium', 'High', 'Critical']).required('priority is required'),
    projectid: yup.number().required('Project ID is required').positive('Project ID must be positive'),
  });

  const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<BugFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<BugFormValues> = async (formData) => {
    console.log(formData);
    try {
      if (!user?.userid) {
        setSubmitError('User not found. Please login again.');
        return;
      }

      if (editingBug) {
        await updateBug({
          id: editingBug,
          data: {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            assignedto: user.userid,
          },
        }).unwrap();
        setEditingBug(null);
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
      }

      reset();
      setSubmitError(null);
    } catch (err: any) {
        console.log(err);
      setSubmitError(err.data?.message || 'Failed to save bug');
    }
  };

  const handleEdit = (bug: any) => {
    setEditingBug(bug.bugid);
    setValue('title', bug.title);
    setValue('description', bug.description || '');
    setValue('priority', bug.priority);
    setValue('projectid', bug.projectid);
  };

  const handleDelete = async (bugid: number) => {
    if (confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(bugid).unwrap();
      } catch (err: any) {
        setSubmitError(err.data?.message || 'Failed to delete bug');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingBug(null);
    reset();
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
                <span>Error loading bugs</span>
            </div>
        </div>
    );

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
                            <h2 className="card-title text-2xl mb-6">{editingBug ? 'Edit Bug' : 'Report a Bug'}</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Bug title"
                                        className={`input input-bordered bg-white text-black w-full mt-2 ${errors.title ? 'input-error' : ''}`}
                                        {...register("title")}
                                    />
                                    {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">description</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered bg-white text-black w-full mt-2 h-28 ${errors.description ? 'textarea-error' : ''}`}
                                        placeholder="Describe the bug"
                                        {...register("description")}
                                    ></textarea>
                                    {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">priority</span>
                                    </label>
                                    <select
                                        className={`select select-bordered bg-white text-black w-full mt-2 ${errors.priority ? 'select-error' : ''}`}
                                        {...register("priority")}
                                    >
                                        <option value="">Select priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                    {errors.priority && <span className="text-error text-sm mt-1">{errors.priority.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Project ID</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Project ID"
                                        className={`input input-bordered bg-white text-black w-full mt-2 ${errors.projectid ? 'input-error' : ''}`}
                                        {...register("projectid")}
                                    />
                                    {errors.projectid && <span className="text-error text-sm mt-1">{errors.projectid.message}</span>}
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={isCreating}>
                                        {isCreating ? 'Saving...' : editingBug ? 'Update Bug' : 'Submit Bug'}
                                    </button>
                                    {editingBug && (
                                        <button type="button" className="btn btn-outline" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                            {submitError && (
                                <div className="alert alert-error mt-4">
                                    <span>{submitError}</span>
                                </div>
                            )}
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
                                            <th className="text-white">title</th>
                                            <th className="text-white">description</th>
                                            <th className="text-white">priority</th>
                                            <th className="text-white">status</th>
                                            <th className="text-white">Project</th>
                                            <th className="text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bugs.length > 0 ? (
                                            bugs.map((bug) => (
                                                <tr key={bug.bugid}>
                                                    <th className="text-white">{bug.bugid}</th>
                                                    <td className="text-white">{bug.title}</td>
                                                    <td className="text-white">{bug.description}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            bug.priority === 'Low' ? 'badge-info' :
                                                            bug.priority === 'Medium' ? 'badge-warning' :
                                                            bug.priority === 'High' ? 'badge-error' :
                                                            'badge-error'
                                                        }`}>
                                                            {bug.priority}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${
                                                            bug.status === 'Open' ? 'badge-info' :
                                                            bug.status === 'In Progress' ? 'badge-warning' :
                                                            bug.status === 'Resolved' ? 'badge-success' :
                                                            'badge-neutral'
                                                        }`}>
                                                            {bug.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-white">{bug.projectid}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline" onClick={() => handleEdit(bug)}>Edit</button>
                                                        <button className="btn btn-sm btn-outline btn-error ml-2" onClick={() => handleDelete(bug.bugid)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center py-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5m.5-4H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5M12 7v4" />
                                                    </svg>
                                                    <span className="text-white/60">No bugs assigned to you yet.</span>
                                                </td>
                                            </tr>
                                        )}
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