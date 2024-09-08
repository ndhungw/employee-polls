import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/dashboard")({
  component: () => (
    <div>
      Hello /_protected/dashboard!
      <div>
        <Link>Link</Link>
      </div>
    </div>
  ),
});
