import { useGetCommentsQuery, useDeleteCommentMutation } from "../../../../features/comments/commentsAPI";

export default function Comments() {
    const { data: comments, isLoading, error } = useGetCommentsQuery();
    const [deleteComment] = useDeleteCommentMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            await deleteComment(id);
        }
    };

    if (isLoading) return <div>Loading comments...</div>;
    if (error) return <div>Error loading comments</div>;

    return (
        <div>
            <h1>All Comments</h1>
            <ul>
                {comments?.map((comment) => (
                    <li key={comment.commentid}>
                        <p>{comment.content}</p>
                        <p>Bug ID: {comment.bugid}, User ID: {comment.userid}</p>
                        <p>Created: {new Date(comment.createdat).toLocaleString()}</p>
                        <button onClick={() => handleDelete(comment.commentid)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}