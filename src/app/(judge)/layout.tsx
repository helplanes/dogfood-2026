import React from "react";
import { SubNav } from "@/components/ui/SubNav";

export default function JudgeLayout({ children }: { children: React.ReactNode }) {
  const judgeLinks = [
    { name: "My Assignments", href: "/judge/dashboard" },
    { name: "Guidelines", href: "/judge/guidelines" },
  ];
  
  return (
    <>
      <SubNav links={judgeLinks} />
      {children}
    </>
  );
}
