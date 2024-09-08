import { fallbackPath } from "@/configs";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import LoginPage from "../modules/login/LoginPage";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect || fallbackPath });
    }
  },
  component: LoginPage,
});
