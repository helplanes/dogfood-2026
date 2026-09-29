import Link from "next/link";

export const metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-stone-100 flex flex-col items-center justify-center px-4 text-center font-sans">
      <span className="text-xs font-mono uppercase tracking-widest text-primary">404</span>
      <h1 className="mt-3 text-4xl font-syne font-bold text-white">Page not found</h1>
      <p className="mt-3 text-sm text-stone-400 max-w-md">
        Nothing lives at this address. Check the link, or head back to the gallery.
      </p>
      <Link
        href="/projects"
        className="mt-8 inline-flex px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
      >
        Back to Gallery
      </Link>
    </div>
  );
}
