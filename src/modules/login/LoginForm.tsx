import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fallbackPath } from "@/configs";
import { sleep } from "@/lib/utils";
import { getRouteApi, useRouter, useRouterState } from "@tanstack/react-router";
import React from "react";
import { useAuthContext } from "../auth/AuthContext";

const Route = getRouteApi("/login");

export function LoginForm() {
  const auth = useAuthContext();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const search = Route.useSearch();

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const fieldValue = data.get("username");

      if (!fieldValue) return;
      const username = fieldValue.toString();
      await auth.login({ username });

      await router.invalidate();

      // This is just a hack being used to wait for the auth state to update
      // in a real app, you'd want to use a more robust solution
      await sleep(1000);

      await navigate({ to: search.redirect || fallbackPath });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset disabled={isLoggingIn}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {isLoggingIn ? "Loading" : "Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </fieldset>
    </form>
  );
}
