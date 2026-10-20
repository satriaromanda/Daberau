import type { Step } from "./types";

/** The 5-step process, shared by the homepage and How We Work. */
export const processSteps: Step[] = [
  { title: "Consult", body: "We listen to your problems and goals.", icon: "messages" },
  { title: "Scope & Quote", body: "Scope, timeline, and cost, all in writing.", icon: "file-text" },
  { title: "Design & Build", body: "Delivered in sprints, with your review at every stage.", icon: "code" },
  { title: "Test & Launch", body: "Thorough testing before go-live.", icon: "rocket" },
  { title: "Support", body: "Monitoring and fixes after launch.", icon: "life-buoy" },
];
