export default function AdminProfile() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Profile</h1>

                    {/* Profile Card */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md fullscreen">
                        <div className="card-body p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src="https://via.placeholder.com/150" alt="Admin Avatar" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="card-title text-2xl">Admin Name</h2>
                                    <p className="text-lg">Administrator</p>
                                    <p>Email: admin@example.com</p>
                                    <p>Joined: January 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}