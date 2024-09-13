import { getQuestionGroupsByUserId } from "@/_DATA";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/modules/auth/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {loading && "Loading..."}
      {!loading && (
        <div className="space-y-12">
          {questionGroup.unanswered.length > 0 && (
            <QuestionsContainer title="Unanswered Questions">
              {questionGroup.unanswered.map((q) => (
                <QuestionCard key={q.id} {...q} />
              ))}
            </QuestionsContainer>
          )}
          {questionGroup.answered.length > 0 && (
            <QuestionsContainer title="Answered Questions">
              {questionGroup.answered.map((q) => (
                <QuestionCard key={q.id} {...q} />
              ))}
            </QuestionsContainer>
          )}
        </div>
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
