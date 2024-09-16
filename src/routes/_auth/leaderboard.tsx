import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/redux/getters";
import { User } from "@/types/app";
import { createFileRoute } from "@tanstack/react-router";

const getNumberOfAnsweredOfUser = (user: User) => Object.keys(user.answers).length;

const getLeaderboard = async () => {
  const plainUsers = await getUsers();
  const rankedUsers = plainUsers.slice().sort((user1, user2) => {
    return (
      -1 *
      (getNumberOfAnsweredOfUser(user1) +
        user1.questions.length -
        (getNumberOfAnsweredOfUser(user2) + user2.questions.length))
    );
  });
  return rankedUsers;
};

export const Route = createFileRoute("/_auth/leaderboard")({
  loader: async () => getLeaderboard(),
  component: LeaderboardRoute,
});

function LeaderboardRoute() {
  const rankedUsers = Route.useLoaderData();
  return (
    <div className="p-4">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-primary">User</TableHead>
            <TableHead className="w-[100px] text-lg text-primary">Answered</TableHead>
            <TableHead className="w-[100px] text-lg text-primary">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.avatarURL} />
                  </Avatar>
                  <div>
                    <div className="text-base text-primary">{user.name}</div>
                    <div className="text-muted-foreground">@{user.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{getNumberOfAnsweredOfUser(user)}</TableCell>
              <TableCell className="text-center">{user.questions.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
