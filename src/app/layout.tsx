import type { ReactNode } from "react";
import "./globals.css";

// PLACEHOLDER from backend scaffold. Shriyash owns this file: replace with the app shell.
export const metadata = { title: "DOGFOOD Portal" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
