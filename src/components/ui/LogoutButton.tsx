"use client";

import { useRouter } from "next/navigation";

// Logout is a POST-only route (/api/auth/logout), never a GET — a plain <Link> to it would 405
// instead of ending the session, since Next.js route handlers only respond to the methods they
// export. This is the one correct way to trigger it from a click.
export function LogoutButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={logout} className={className}>
      {children}
    </button>
  );
}
