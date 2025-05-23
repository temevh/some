import CommentCard from "./commentcard";
import { Comment } from "../interfaces";
import { useMobile } from "@/context/mobilecontext";
import { Smile, Frown, Meh } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";

const MAX_WORDS = 10;

interface CourseCommentsProps {
  comments: Comment[];
}

const CourseComments = ({ comments }: CourseCommentsProps) => {
  const isMobile = useMobile();
  //Move comment filtering to backend
  const positiveComments = [];
  const negativeComments = [];
  const neutralComments = [];

  if (comments.length === 0) {
    return <p>Ei kommentteja kurssista</p>;
  }

  for (const comment of comments) {
    if (comment.sentiment === 1) {
      positiveComments.push(comment);
    } else if (comment.sentiment === -1) {
      negativeComments.push(comment);
    } else {
      neutralComments.push(comment);
    }
  }

  const loadMoreComments = ({ sentiment }) => {};

  if (isMobile) {
    return (
      <div className="text-center">
        <p className="text-black text-lg mb-4">
          Mitä ihmiset sanovat kurssista
        </p>
        <div className="grid grid-cols-1 gap-4 place-items-center">
          {comments.map((comment: Comment) => (
            <CommentCard
              key={comment.content}
              comment={comment}
              MAX_WORDS={MAX_WORDS}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex flex-row items-center justify-center gap-2 mb-6">
        <p className="text-black text-xl">Mitä ihmiset sanovat kurssista</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full text-gray-600 cursor-pointer">
              ?
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            Kommenttien luokittelu perustuu tekoälyyn, virheet ovat siis
            mahdollisia
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {/* Positive Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Smile color="green" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {positiveComments.map((comment) => (
              <CommentCard
                key={comment.content}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
          <p
            className="text-sm text-gray-500"
            onClick={(positive) => loadMoreComments(positive)}
          >
            Lisää kommentteja
          </p>
        </div>

        {/* Neutral Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Meh color="gray" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {neutralComments.map((comment) => (
              <CommentCard
                key={comment.content}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
        </div>

        {/* Negative Comments */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <Frown color="red" size={34} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            {negativeComments.map((comment) => (
              <CommentCard
                key={comment.content}
                comment={comment}
                MAX_WORDS={MAX_WORDS}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComments;
