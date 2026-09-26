import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">How It Works</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Participants</h2>
        <p className="text-gray-700">
          Participants can form teams and submit their projects before the deadline. 
          Make sure your repository link and summary are included.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Judges</h2>
        <p className="text-gray-700">
          Judges will score assigned projects based on functionality, quality, and innovation.
          Scores are on a 1-5 scale.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Organizers</h2>
        <p className="text-gray-700">
          Organizers manage the event, oversee the judging process, and can export final results.
        </p>
      </section>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
