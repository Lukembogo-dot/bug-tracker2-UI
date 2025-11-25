export default function Comments() {
    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Comments</h1>

                {/* Hero Image */}
                <div className="hero bg-base-200 rounded-box mb-6">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src="/src/assets/bugs.jpg" className="max-w-sm rounded-lg shadow-2xl" alt="Comments and collaboration illustration" />
                        <div>
                            <h1 className="text-5xl font-bold">Collaborate & Comment</h1>
                            <p className="py-6">Share your thoughts, feedback, and insights on bugs and projects with the team.</p>
                        </div>
                    </div>
                </div>

                {/* Add Comment Form */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title">Add a Comment</h2>
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bug/Project ID</span>
                                </label>
                                <input type="text" placeholder="Enter bug or project ID" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Comment</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Write your comment here"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Post Comment</button>
                        </form>
                    </div>
                </div>

                {/* Comments List */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">All Comments</h2>
                        <div className="space-y-4">
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User avatar" src="" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    User1
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">This bug is critical and needs immediate attention.</div>
                                <div className="chat-footer opacity-50">Bug ID: 1</div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User avatar" src="" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    User2
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I agree, let's prioritize this fix.</div>
                                <div className="chat-footer opacity-50">Bug ID: 1</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User avatar" src="" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    User3
                                    <time className="text-xs opacity-50">12:50</time>
                                </div>
                                <div className="chat-bubble">New project looks great! When do we start development?</div>
                                <div className="chat-footer opacity-50">Project ID: 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}