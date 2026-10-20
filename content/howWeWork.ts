export const howWeWork = {
  meta: {
    title: "How We Work | Daberau",
    description: "A clear process, from day one to long after launch: consult, scope, build, launch, and support.",
  },
  h1: "A clear process, from day one to long after launch",
  sub: "Five stages, no surprises. Here's what happens, what you get, and what we need from you.",
  stagesTitle: "Your project, *step by step*",
  labels: { happens: "What happens", get: "What you get", time: "How long it takes", role: "Your role" },
  // Expanded stage details are sample copy.
  stages: [
    {
      happens: "A 30-minute call or meeting where we listen to your problems, goals, and constraints.",
      get: "A short summary of what we heard and our first recommendation.",
      time: "1–2 days",
      role: "Share your goals, current tools, and any deadlines.",
    },
    {
      happens: "We define features, phases, and deliverables, then price each phase.",
      get: "A written proposal with scope, timeline, and an itemized quote.",
      time: "[X]–[X] business days",
      role: "Review the proposal and confirm priorities.",
    },
    {
      happens: "We design and build in short sprints and demo progress at the end of each one.",
      get: "Weekly updates and access to the project board.",
      time: "Depends on scope, confirmed in the proposal",
      role: "Give feedback at each review so we stay on schedule.",
    },
    {
      happens: "We test on real devices and data, fix issues, and plan the go-live together.",
      get: "A tested, launched product and a handover session.",
      time: "[X]–[X] weeks",
      role: "Join user acceptance testing and approve the launch.",
    },
    {
      happens: "We monitor your system, fix bugs under warranty, and handle updates.",
      get: "A [X]-day bug-fix warranty and an optional monthly maintenance plan.",
      time: "Ongoing",
      role: "Report issues through the agreed support channel.",
    },
  ],
  engagement: {
    title: "Choose how we *work together*",
    sub: "Three ways to engage, depending on how clear your scope is.",
    items: [
      { title: "Fixed Price", body: "Best when the scope is clear. One price, agreed upfront, paid by milestone." },
      { title: "Time & Materials", body: "Best when the scope will evolve. You pay for the hours used, reported weekly." },
      { title: "Monthly Retainer", body: "Best for ongoing work and support. A set number of hours every month." },
    ],
  },
  warranty: {
    title: "We don't disappear *after launch*",
    sub: "What's covered once your project goes live.",
    items: [
      { title: "Bug-fix warranty", body: "We fix bugs reported within [X] days of launch at no extra cost." },
      { title: "Response time", body: "Maintenance clients get a first response within [X] business hours." },
      { title: "Monthly reports", body: "Uptime, updates, and fixes, summarized every month." },
    ],
  },
  tools: {
    title: "Work with us in the tools *you already use*",
    sub: "Updates, files, and feedback stay in one place.",
    items: ["Google Meet", "Zoom", "WhatsApp", "Slack", "Jira", "Trello", "Figma", "Google Drive"],
  },
};
