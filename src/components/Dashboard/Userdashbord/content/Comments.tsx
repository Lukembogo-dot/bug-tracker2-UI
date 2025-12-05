import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetCommentsQuery, useCreateCommentMutation } from '../../../../features/comments/commentsAPI';
import bugsImage from '../../../../assets/bugs.jpg';

type CommentFormValues = {
  bugid: number;
  username?: string;
  commenttext: string;

};

export default function Comments() {
    const { data, isLoading, error } = useGetCommentsQuery();
    const comments = data?.comments || [];
    const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

    const [submitError, setSubmitError] = useState<string | null>(null);

    const schema = yup.object().shape({
      bugid: yup.number().required('Bug ID is required').positive('Bug ID must be positive'),
      commenttext: yup.string().required('Comment content is required').min(5, 'Comment must be at least 5 characters'),
    });

    const { handleSubmit, register, reset, formState: { errors } } = useForm<CommentFormValues>({
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CommentFormValues> = async (formData) => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.userid) {
          setSubmitError('User not found. Please login again.');
          return;
        }

        await createComment({
            bugid: Number(formData.bugid),
            userid: Number(user.userid),
            commenttext: formData.commenttext,
        }).unwrap();

        reset();
        setSubmitError(null);
      } catch (err: any) {
        setSubmitError(err.data?.message || 'Failed to create comment');
      }
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
                <span>Error loading comments</span>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Comments</h1>

                    {/* Hero Image */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                        <div className="card-body p-6">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src={bugsImage} className="max-w-sm rounded-lg shadow-2xl" alt="Comments and collaboration illustration" />
                                <div>
                                    <h1 className="text-4xl font-bold">Collaborate & Comment</h1>
                                    <p className="py-6">Share your thoughts, feedback, and insights on bugs and projects with the team.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Comment Form */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">Add a Comment</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Bug ID</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter bug ID"
                                        className={`input input-bordered bg-white text-black w-full mt-2 ${errors.bugid ? 'input-error' : ''}`}
                                        {...register("bugid")}
                                    />
                                    {errors.bugid && <span className="text-error text-sm mt-1">{errors.bugid.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Comment</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered bg-white text-black w-full mt-2 h-28 ${errors.commenttext ? 'textarea-error' : ''}`}
                                        placeholder="Write your comment here"
                                        {...register("commenttext")}
                                    ></textarea>
                                    {errors.commenttext && <span className="text-error text-sm mt-1">{errors.commenttext.message}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                                    {isCreating ? 'Posting...' : 'Post Comment'}
                                </button>
                            </form>
                            {submitError && (
                                <div className="alert alert-error mt-4">
                                    <span>{submitError}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="card bg-black/60 text-white shadow-xl rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">All Comments</h2>
                            <div className="space-y-4">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.commentid} className="chat chat-start">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <div className="bg-gray-400 w-full h-full rounded-full flex items-center justify-center text-white text-sm">
                                                        U
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chat-header">
                                                User {comment.username || comment.userid}
                                                <time className="text-xs opacity-50">
                                                    {new Date(comment.createdat).toLocaleString()}
                                                </time>
                                            </div>
                                            <div className="chat-bubble text-white">{comment.commenttext}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span className="text-white/60">No comments yet. Be the first to comment!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}