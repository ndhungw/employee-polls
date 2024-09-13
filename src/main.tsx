import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import "./style/globals.css";

// Import the generated route tree
import LoadingOverlay from "./components/LoadingOverlay";
import { AuthProvider, useAuthContext } from "./modules/auth/AuthContext";
import { routeTree } from "./routeTree.gen";
import { RootRouteWithContext } from "./types/router";

const defaultRouteContext = {
  auth: undefined!, // We'll inject this when we render
} satisfies RootRouteWithContext;

// Create a new router instance
const router = createRouter({
  routeTree,
  context: defaultRouteContext,
  defaultPendingComponent: () => <LoadingOverlay />,
  defaultErrorComponent: () => <div>Unexpected error!</div>,
  defaultNotFoundComponent: () => <div>Not found!</div>,
  defaultPendingMinMs: 500,
  defaultPendingMs: 500,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuthContext();
  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />
    // <StrictMode>
    // </StrictMode>,
  );
}
