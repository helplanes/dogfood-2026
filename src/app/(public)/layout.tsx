import React from "react";
import { GlobalNav } from "@/components/ui/GlobalNav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />
      {children}
    </>
  );
}
