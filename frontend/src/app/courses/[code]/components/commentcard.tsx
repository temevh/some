import { useState } from "react";
import { Button } from "@/app/components/ui/button";

type Comment = {
  content: string;
  createdAt: string | number | Date;
};

interface CommentCardProps {
  comment: Comment;
  MAX_WORDS: number;
}

const CommentCard = ({ comment, MAX_WORDS }: CommentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const words = comment.content.split(" ");

  const isLong = words.length > MAX_WORDS;
  const displayedText = expanded
    ? comment.content
    : words.slice(0, MAX_WORDS).join(" ") + (isLong ? "..." : "");

  return (
    <div className="p-1 flex flex-col  bg-white border-black border-2 rounded-lg ">
      <p className="text-gray-800 leading-relaxed text-center">
        {displayedText}
      </p>
      <div className="flex flex-row justify-center items-center mt-1">
        {isLong && (
          <Button
            className="p-0 h-auto text-blue-600 hover:text-blue-700"
            variant="reverse"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Näytä vähemmän" : "Näytä lisää"}
          </Button>
        )}
        <p className="text-gray-500 text-xs">
          {new Date(comment.createdAt).toLocaleDateString("fi-FI")}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
