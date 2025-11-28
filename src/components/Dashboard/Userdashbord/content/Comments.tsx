export default function Comments() {
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
                                <img src="/src/assets/bugs.jpg" className="max-w-sm rounded-lg shadow-2xl" alt="Comments and collaboration illustration" />
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
                            <form className="space-y-4">
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Bug/Project ID</span>
                                    </label>
                                    <input type="text" placeholder="Enter bug or project ID" className="input input-bordered bg-white text-black w-full mt-2" />
                                </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text text-white">Comment</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered bg-white text-black w-full mt-2 h-28" placeholder="Write your comment here"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Post Comment</button>
                            </form>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="card bg-black/60 text-white shadow-xl rounded-md">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-6">All Comments</h2>
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
        </div>
    );
}