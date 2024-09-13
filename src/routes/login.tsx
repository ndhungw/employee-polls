import { fallbackPath } from "@/configs";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { useAuthContext } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sleep } from "@/lib/utils";
import { getExistingUsernames, getUserByUsername } from "@/redux/getters";
import { User } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useRouterState } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect || fallbackPath });
    }
  },
  component: () => (
    <div className="h-full container flex items-center justify-center">
      <LoginForm />
    </div>
  ),
});

const FormSchema = z.object({
  username: z.string({
    required_error: "Please select an username to login.",
  }),
});

export function LoginForm() {
  const auth = useAuthContext();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const search = Route.useSearch();

  //#region Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  //#endregion Form

  const onSubmit = async ({ username }: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      if (!username) {
        return;
      }
      const user = await getUserByUsername(username);
      if (!user) {
        throw new Error();
      }

      await auth.login(user);
      await router.invalidate();

      // This is just a hack being used to wait for the auth state to update
      // in a real app, you'd want to use a more robust solution
      await sleep(1);

      await navigate({ to: search.redirect || fallbackPath });
      toast({
        title: "Logged in with",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify({ username }, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [existingUsernames, setExistingUsername] = useState<User["name"][]>([]);

  useEffect(() => {
    setLoadingUsers(true);
    getExistingUsernames()
      .then(setExistingUsername)
      .finally(() => setLoadingUsers(false));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={loadingUsers || isLoggingIn}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your username below to login to your account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a username to login" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {existingUsernames.map((username) => (
                          <SelectItem key={username} value={username}>
                            {username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                {isLoggingIn ? "Loading..." : "Sign in"}
              </Button>
            </CardFooter>
          </Card>
        </fieldset>
      </form>
    </Form>
  );
}
