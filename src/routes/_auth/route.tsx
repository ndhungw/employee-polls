import { sleep } from "@/lib/utils";
import { useAuthContext } from "@/modules/auth/AuthContext";
import { getStoredUser } from "@/modules/auth/AuthStore";
import AuthLayout from "@/modules/shared/layout/AuthLayout";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";

class UserNotFound extends Error {}

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.user) {
      try {
        // attempt to get stored user info
        const user = await getStoredUser();

        // throw error if cannot find any
        if (!user || !user.username) {
          throw new UserNotFound();
        }

        // set data for the AuthContext
        context.auth.setUser(user);
      } catch (error) {
        if (error instanceof UserNotFound) {
          throw redirect({
            to: "/login",
            search: {
              redirect: location.href,
            },
          });
        } else {
          throw redirect({
            to: "/login",
            search: {
              redirect: location.href,
            },
          });
        }
      }
    }
  },
  component: AuthRoute,
});

function AuthRoute() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuthContext();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() =>
        router
          .invalidate()
          .then(() => sleep(10))
          .then(() => navigate({ to: "/" })),
      );
    }
  };

  return (
    <AuthLayout logout={handleLogout}>
      <Outlet />
    </AuthLayout>
  );
}
