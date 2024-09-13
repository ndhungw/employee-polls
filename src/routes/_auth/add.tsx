import { _saveQuestion } from "@/_DATA";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/modules/auth/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_auth/add")({
  component: AddRoute,
});

const formSchema = z.object({
  optionOneText: z.string().min(2, {
    message: "Option must be at least 2 characters.",
  }),
  optionTwoText: z.string().min(2, {
    message: "Option must be at least 2 characters.",
  }),
});

function AddRoute() {
  const { user } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      optionOneText: "",
      optionTwoText: "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (!user) return;
    const res = await _saveQuestion({
      author: user.id,
      ...values,
    });
    toast({
      title: "Create poll successfully!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="p-4 text-center space-y-4">
      <div className="text-3xl text-primary font-semibold">Would You Rather</div>
      <div className="text-lg text-muted-foreground">Create Your Own Poll</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded p-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="optionOneText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option One</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option one" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="optionTwoText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option Two</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option one" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
