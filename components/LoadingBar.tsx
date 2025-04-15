export default function LoadingBar() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 h-full w-1/2 bg-blue-600 rounded-full animate-loading-bar"></div>
            </div>
        </div>
    )
}