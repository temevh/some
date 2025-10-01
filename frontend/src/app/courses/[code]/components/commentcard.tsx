import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

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
    <Card className="p-2 flex flex-col justify-between bg-white border">
      <p className="text-gray-800 leading-relaxed text-center">
        {displayedText}
      </p>
      <div className="flex flex-row justify-between items-center mt-3">
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
    </Card>
  );
};

export default CommentCard;
