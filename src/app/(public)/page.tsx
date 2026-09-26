import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          DOGFOOD 2026 Hackathon
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to the official portal for submission and judging. Explore the innovative projects built by our teams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/projects" 
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Projects
          </Link>
          <Link 
            href="/help" 
            className="px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            How it Works
          </Link>
        </div>
      </div>
    </main>
  );
}
