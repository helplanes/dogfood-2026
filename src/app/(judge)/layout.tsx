import React from "react";
import { JudgeSidebar } from "@/components/ui/JudgeSidebar";

export default function JudgeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#08090d]">
      <div className="hidden md:block">
        <JudgeSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
