import React from "react";
import { SubNav } from "@/components/ui/SubNav";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const organizerLinks = [
    { name: "Overview", href: "/organizer/dashboard" },
    { name: "Results", href: "/organizer/results" },
    { name: "Assignments", href: "/organizer/assignments" },
    { name: "Rubric", href: "/organizer/rubric" },
    { name: "Audit Log", href: "/organizer/audit" },
  ];
  
  return (
    <>
      <SubNav links={organizerLinks} />
      {children}
    </>
  );
}
