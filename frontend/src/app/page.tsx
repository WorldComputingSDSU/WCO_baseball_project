// This component will be displayed when the user visits '/'

// This is a Server Component by default, which is great for a landing page.

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to the SDSU Athletics Baseball Website
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your centralized hub to see our roster, schedule, and performance metrics.
      </p>

      <div className="space-x-4">
        <a 
          href="/roster" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          View Roster & Data
        </a>
        <a 
          href="/team-info" 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Learn About the Team
        </a>
      </div>

      <p className="mt-16 text-sm text-gray-500">
        Use the navigation bar above to explore all features.
      </p>
    </div>
  );
}