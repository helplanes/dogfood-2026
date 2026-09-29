export const landingData = {
  hero: {
    statusBadge: "SYS READY · REGISTRATION OPEN",
    title: "Build the platform",
    titleHighlight: "that will judge you.",
    subtitle: "An open-source, self-hostable hackathon platform featuring strict track isolation, double-blind reviews, and normalized z-score judging.",
    dateLabel: "September 26-29, 2026",
    prizeLabel: "Free · $2,500 in prizes",
  },
  stats: [
    { label: "hackathons", value: "35", description: "Hackathon Raptors has run since 2023, across 85+ countries." },
    { label: "major platforms", value: "0", description: "publish an official public API. The ecosystem runs on scrapers." },
    { label: "hours", value: "5", description: "for one judge to score 30 projects, by standard estimates." },
    { label: "countdown", value: "72h", description: "to build the thing that replaces all of it." }
  ],
  brief: {
    label: "BRIEF / 00",
    text: "Thirty-five hackathons in, across 85 countries, we know exactly what a submission and judging platform should do. What none of us has is a modern, open, self-hostable platform that does it. This is the hackathon where you build it. The winning project is the one we run."
  },
  tiers: [
    {
      id: "T1",
      name: "Core",
      description: "Required. A submission that does not clear T1 is not judged. This is the floor, not the target.",
      features: [
        "Authentication and sessions",
        "A real role model: visitor, participant, judge, organizer, admin",
        "Event creation with configurable dates, tracks and prizes",
        "Team formation by invite link",
        "Project submission with draft-and-edit",
        "Deadline enforcement that actually holds",
        "Public gallery with search and filter"
      ]
    },
    {
      id: "T2",
      name: "Isolation",
      description: "Strict track and judge isolation to guarantee fairness.",
      features: [
        "Judge-specific scoring queues",
        "Double-blind project assignments",
        "Z-Score shrinkage normalization",
        "Immutable audit log"
      ]
    }
  ],
  validation: [
    {
      num: "01",
      title: "Double-Blind Review",
      desc: "Reviewers and submitters remain anonymous to prevent bias. Tracks are strictly isolated on the backend."
    },
    {
      num: "02",
      title: "Z-Score Shrinkage",
      desc: "Programmatic normalization of judge scores. Harsh graders won't tank a project; overly generous ones won't falsely elevate."
    }
  ],
  dossier: [
    { title: "You keep your work.", desc: "Ship under MIT or Apache-2.0. The repo is yours. No exclusivity." },
    { title: "We fork it and run it.", desc: "The winning project gets forked, self-hosted, and put into production." },
    { title: "You get credited.", desc: "A credit line on every event page the platform powers." },
    { title: "We upstream back.", desc: "Every fix, hardening pass and feature we add gets sent back as a PR." }
  ],
  faqs: [
    {
      q: "How is the submission deadline enforced?",
      a: "The deadline is strictly enforced by the backend database clock (UTC). The frontend UI only reflects this truth. There are no client-side bypasses."
    },
    {
      q: "Are the source repositories public?",
      a: "Yes, all submitted projects in the gallery include direct links to their source repositories and 5-minute video demos for complete transparency."
    },
    {
      q: "Who can see the normalized score data?",
      a: "Organizers have full access to raw and normalized data, as well as the complete audit log of all scoring events via the Organizer Dashboard."
    }
  ],
  pipeline: [
    { step: "01", name: "Registration & Teams", desc: "Form teams via invite links before the strict deadline hits." },
    { step: "02", name: "Submissions", desc: "Draft and edit your project securely until the UTC lock." },
    { step: "03", name: "Double-Blind Scoring", desc: "Projects are assigned anonymously. Tracks are rigorously isolated." },
    { step: "04", name: "Normalization", desc: "Z-score shrinkage automatically centers harsh and generous graders." }
  ],
  ecosystem: [
    { title: "No Network Dependency", desc: "Runs completely offline. No CDNs, hosted DBs, or external APIs at runtime." },
    { title: "API-First Architecture", desc: "Open API contract via Zod schemas means you own your data." },
    { title: "Self-Hostable", desc: "A single docker compose up yields a fully seeded, working portal." }
  ]
};
