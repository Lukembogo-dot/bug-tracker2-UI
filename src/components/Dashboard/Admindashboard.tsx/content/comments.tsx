import { useGetCommentsQuery, useDeleteCommentMutation } from "../../../../features/comments/commentsAPI";

export default function Comments() {
    const { data, isLoading, error } = useGetCommentsQuery();
    const comments = data?.comments;
    const [deleteComment] = useDeleteCommentMutation();

    const handleDelete = async (id?: number) => {
        if (!id) {
            console.error("Cannot delete comment: ID is undefined");
            return;
        }

        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteComment(id).unwrap();
                alert("Comment deleted successfully");
            } catch (err: any) {
                alert(err.data?.message || "Failed to delete comment");
            }
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
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6 md:p-10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl font-bold text-white mb-6">All Comments</h1>

                    <div className="space-y-4">
                        {comments && comments.length > 0 ? (
                            comments.map((comment) => {
                                const commentId = comment.commentid || comment.id;

                                return (
                                    <div key={commentId} className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <div className="bg-gray-400 w-full h-full rounded-full flex items-center justify-center text-white text-sm">
                                                    {comment.username ? comment.username.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-header text-white/80 text-center">
                                            {comment.username || `User ID: ${comment.userid}`}
                                            <time className="text-xs opacity-50">
                                                {new Date(comment.createdat).toLocaleString()}
                                            </time>
                                        </div>
                                        <div className="chat-bubble text-white">{comment.commenttext}</div>
                                        <div className="chat-footer text-white/60">
                                            {commentId && (
                                                <button
                                                    onClick={() => handleDelete(commentId)}
                                                    className="btn btn-xs btn-error ml-2"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="card bg-black/60 text-white shadow-xl rounded-md">
                                <div className="card-body p-6 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="text-white/60">No comments found</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}