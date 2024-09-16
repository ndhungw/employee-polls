import { useAuthContext } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { getQuestionGroupsByUserId } from "@/redux/getters";
import { Question } from "@/types/app";
import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_auth/")({
  component: DashboardPage,
});
function useQuestionGroup(userId: string | null | undefined) {
  const [loading, setLoading] = useState(false);

  const [questionGroup, setQuestionGroup] = useState<
    Awaited<ReturnType<typeof getQuestionGroupsByUserId>>
  >({
    answered: [],
    unanswered: [],
  });

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getQuestionGroupsByUserId(userId)
      .then(setQuestionGroup)
      .finally(() => setLoading(false));
  }, [userId]);

  return {
    loading,
    questionGroup,
  };
}

function DashboardPage() {
  const { user } = useAuthContext();
  const { loading, questionGroup } = useQuestionGroup(user?.id);
  const [questionGroupType, setQuestionGroupType] = useState<"unanswered" | "answered">(
    "unanswered"
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {loading && "Loading..."}
      {!loading && (
        <>
          <div className="flex items-center gap-3">
            <Label htmlFor="questionGroupType">Answered questions</Label>
            <Switch
              id="questionGroupType"
              checked={questionGroupType === "answered"}
              onCheckedChange={(checked) => {
                setQuestionGroupType(checked ? "answered" : "unanswered");
              }}
            />
          </div>

          {questionGroupType === "unanswered" && questionGroup.unanswered.length > 0 && (
            <QuestionsContainer title="Unanswered Questions">
              {questionGroup.unanswered.map((q) => (
                <QuestionCard key={q.id} {...q} />
              ))}
            </QuestionsContainer>
          )}

          {questionGroupType === "answered" && questionGroup.answered.length > 0 && (
            <QuestionsContainer title="Answered Questions">
              {questionGroup.answered.map((q) => (
                <QuestionCard key={q.id} {...q} />
              ))}
            </QuestionsContainer>
          )}
        </>
      )}
    </main>
  );
}

function QuestionsContainer({ children, title }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded bg-white">
      <div className="p-2 text-2xl font-bold border-b text-center">{title}</div>
      <div className="p-4 grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function QuestionCard({ author, timestamp, id }: Question) {
  return (
    <div className="p-2 border border-secondary rounded bg-white">
      <div className="text-center">
        <div className="text-lg font-semibold">{author}</div>
        <div className="text-sm text-neutral-700">
          {dayjs(timestamp).format("HH:mm | DD/MM/YYYY")}
        </div>
        <div className="mt-4 pt-2 border-t border-t-secondary">
          <Button variant={"outline"} className="w-full" asChild>
            <Link
              to="/questions/$questionId"
              params={{
                questionId: id,
              }}
            >
              Show
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
