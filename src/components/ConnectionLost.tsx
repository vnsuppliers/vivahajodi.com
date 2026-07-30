const ConnectionLost = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-3xl font-bold">No Internet Connection</h1>

                <p className="mt-3 text-gray-500">
                    Please check your internet connection.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 rounded bg-blue-600 px-5 py-2 text-white"
                >
                    Retry
                </button>
            </div>
        </div>
    );
};

export default ConnectionLost;