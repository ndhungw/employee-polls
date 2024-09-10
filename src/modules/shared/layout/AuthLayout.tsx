import { Link } from "@tanstack/react-router";

import {
  //
  CircleUser,
  Home,
  LeafyGreen,
  Menu,
  Package,
  Package2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthContextValue, useAuthContext } from "@/modules/auth/AuthContext";
import { useState } from "react";

const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    Icon: Home,
    exact: true,
  },
  {
    path: "/leaderboard",
    label: "Leader board",
    Icon: LeafyGreen,
    exact: true,
  },
  {
    path: "/polls/create",
    label: "New poll",
    Icon: Package,
    exact: true,
  },
];

const AuthLayout = ({
  children,
  logout,
}: {
  children: React.ReactNode;
  logout: AuthContextValue["logout"];
}) => {
  const { user } = useAuthContext();
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <>
      <div className="grid min-h-full w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Employee Polls</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                    activeProps={{
                      className: "bg-muted text-primary",
                    }}
                    inactiveProps={{
                      className: "bg-transparent text-muted-foreground hover:text-primary",
                    }}
                    activeOptions={{
                      exact: route.exact,
                    }}
                  >
                    <route.Icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Employee Polls</span>
                  </Link>
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      activeProps={{
                        className: "bg-muted text-primary",
                      }}
                      inactiveProps={{
                        className: "bg-transparent text-muted-foreground hover:text-primary",
                      }}
                      activeOptions={{
                        exact: route.exact,
                      }}
                      onClick={() => setOpenSheet(false)}
                    >
                      <route.Icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
