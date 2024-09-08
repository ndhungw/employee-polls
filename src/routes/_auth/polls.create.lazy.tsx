import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/polls/create")({
  component: () => <div>Hello /poll/create!</div>,
});
