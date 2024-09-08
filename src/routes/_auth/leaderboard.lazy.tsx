import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/leaderboard")({
  component: () => <div>Hello /leader-board!</div>,
});
