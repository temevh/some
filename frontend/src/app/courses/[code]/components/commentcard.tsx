import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const CommentCard = ({ comment, MAX_WORDS }) => {
  const [expanded, setExpanded] = useState(false);
  const words = comment.content.split(" ");

  const isLong = words.length > MAX_WORDS;
  const displayedText = expanded
    ? comment.content
    : words.slice(0, MAX_WORDS).join(" ") + (isLong ? "..." : "");

  return (
    <Card className="p-2 flex flex-col justify-between">
      <p>{displayedText}</p>
      <div className="flex flex-row justify-between items-center mt-2">
        {isLong && (
          <Button
            variant="link"
            className="text-blue-500 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Näytä vähemmän" : "Näytä lisää"}
          </Button>
        )}
        <p className="text-gray-500 text-sm">
          {new Date(comment.createdAt).toLocaleDateString("fi-FI")}
        </p>
      </div>
    </Card>
  );
};

export default CommentCard;
