import { useAuthContext } from "@/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/app/hook";
import { getQuestionById, getUserByUsername } from "@/redux/getters";
import { appActions } from "@/redux/slices/appSlice";
import { Option, VotingOption } from "@/types/app";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { CircleCheckBigIcon } from "lucide-react";
export const Route = createFileRoute("/_auth/questions/$questionId")({
  loader: async ({ params: { questionId } }) => {
    const question = await getQuestionById(questionId);
    if (!question) {
      throw notFound();
    }
    const author = await getUserByUsername(question.author);
    return { question, author };
  },
  component: QuestionDetail,
  notFoundComponent: () => <div className="mt-10 text-center">Not found question!</div>,
});

function QuestionDetail() {
  const { question, author } = Route.useLoaderData();
  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;
  const totalVoteCount = optionOneVotes.length + optionTwoVotes.length;

  const router = useRouter();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const onVote = (option: Option) => async () => {
    if (!user) return;

    const isSucceeded = dispatch(
      appActions.saveQuestionAnswer({
        authedUser: user.id,
        qid: question.id,
        answer: option,
      })
    );

    if (isSucceeded) {
      toast({
        title: "Successfully!",
        description: `Voted option: "${question[option].text}"`,
      });
      router.invalidate();
    }
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <div className="text-3xl text-center">Poll by {question.author}</div>
        <div className="flex items-center justify-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src={author?.avatarURL ?? ""} />
            <AvatarFallback>{question.author.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-2xl text-center">Would you rather</div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <OptionView
            {...question.optionOne}
            totalVoteCount={totalVoteCount}
            onVote={onVote("optionOne")}
          />
          <OptionView
            {...question.optionTwo}
            totalVoteCount={totalVoteCount}
            onVote={onVote("optionTwo")}
          />
        </div>
      </div>
    </div>
  );
}

function ButtonVote({ voted, ...props }: ButtonProps & { voted: boolean }) {
  return (
    <Button className="w-full rounded-none" size={"lg"} disabled={voted} {...props}>
      {voted && <CircleCheckBigIcon className="mr-2 h-4 w-4" />}
      {voted ? "You voted this option" : "Vote"}
    </Button>
  );
}

type OptionViewProps = VotingOption & {
  totalVoteCount: number;
  onVote: () => Promise<void>;
};
function OptionView({ text, votes, totalVoteCount, onVote }: OptionViewProps) {
  const rate = totalVoteCount ? (votes.length / totalVoteCount) * 100 : 0;
  const { user } = useAuthContext();
  return (
    <div className="pt-4 flex flex-col gap-3 justify-center border rounded-lg overflow-hidden">
      <div className="text-center text-xl">{text}</div>
      <div className="mt-auto">
        <div className="mb-2 text-center text-secondary-foreground">
          {votes.length} vote(s)
          {isNaN(rate) ? null : `as ${rate.toFixed(2)}%`}
        </div>
        <ButtonVote voted={!!(user && votes.includes(user.id))} onClick={onVote} />
      </div>
    </div>
  );
}
