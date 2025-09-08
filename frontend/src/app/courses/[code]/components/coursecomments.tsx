import CommentCard from "./commentcard";
import { Comment } from "../interfaces";
import { useMobile } from "@/context/mobilecontext";
import { Smile, Frown, Meh } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";
import axios from "axios";
import { useState } from "react";
import { getMoreComments } from "@/lib/api";
import { useTranslation } from "react-i18next";

const MAX_WORDS = 10;

interface CourseCommentsProps {
  comments: {
    positive: Comment[];
    neutral: Comment[];
    negative: Comment[];
  };
  courseCode: string;
}

const CourseComments = ({ comments, courseCode }: CourseCommentsProps) => {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [allComments, setAllComments] = useState(comments);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  if (
    allComments.positive.length === 0 &&
    allComments.neutral.length === 0 &&
    allComments.negative.length === 0
  ) {
    return <p>{t("no-comments")}</p>;
  }

  if (isMobile) {
    return (
      <div className="text-center">
        <p className="text-black text-lg mb-4">{t("what-people-say")}</p>
        <div className="grid grid-cols-1 gap-4 place-items-center">
          {allComments.positive.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              MAX_WORDS={MAX_WORDS}
            />
          ))}
        </div>
      </div>
    );
  }

  const handleGetMoreComments = async (sentiment: string) => {
    setLoading((prev) => ({ ...prev, [sentiment]: true }));

    try {
      const newComments = await getMoreComments(
        courseCode,
        sentiment,
        allComments[sentiment as keyof typeof allComments].length
      );

      if (newComments.length > 0) {
        setAllComments((prev) => ({
          ...prev,
          [sentiment]: [
            ...prev[sentiment as keyof typeof prev],
            ...newComments,
          ],
        }));
      }
    } finally {
      setLoading((prev) => ({ ...prev, [sentiment]: false }));
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-row items-center justify-center gap-2 mb-6">
        <p className="text-black text-xl">{t("what-people-say")}</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full text-gray-600 cursor-pointer">
              ?
            </div>
          </HoverCardTrigger>
          <HoverCardContent>{t("comment-ai-info")}</HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {/* Positive Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Smile color="green" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {allComments.positive.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
          <button
            className="text-sm text-gray-500 disabled:opacity-50 pt-2"
            onClick={() => handleGetMoreComments("positive")}
            disabled={loading.positive}
          >
            {loading.positive ? t("loading-info") : t("more-comments")}
          </button>
        </div>

        {/* Neutral Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Meh color="gray" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {allComments.neutral.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
          <button
            className="text-sm text-gray-500 disabled:opacity-50 pt-2"
            onClick={() => handleGetMoreComments("neutral")}
            disabled={loading.neutral}
          >
            {loading.neutral ? t("loading-info") : t("more-comments")}
          </button>
        </div>

        {/* Negative Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Frown color="red" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {allComments.negative.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
          <button
            className="text-sm text-gray-500 disabled:opacity-50 pt-2"
            onClick={() => handleGetMoreComments("negative")}
            disabled={loading.negative}
          >
            {loading.negative ? t("loading-info") : t("more-comments")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseComments;
