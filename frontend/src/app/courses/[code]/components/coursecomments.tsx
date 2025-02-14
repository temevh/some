import CommentCard from "./commentcard";
import { useMobile } from "@/context/mobilecontext";

const MAX_WORDS = 10;

const CourseComments = ({ comments }) => {
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

  if (isMobile) {
    return (
      <div className="text-center">
        <p className="text-black text-lg mb-4">
          Mitä ihmiset sanovat kurssista
        </p>
        <div className="grid grid-cols-1 gap-4 place-items-center">
          {comments.map((comment) => (
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
      <p className="text-black text-xl mb-4">Mitä ihmiset sanovat kurssista</p>
      <div className="gap-6 place-items-center flex flex-row">
        <div>
          <p>Positiiviset kommentit</p>
          {positiveComments.map((comment) => (
            <CommentCard
              key={comment.content}
              comment={comment}
              MAX_WORDS={MAX_WORDS}
            />
          ))}
        </div>
        <div>
          <p>Kriittiset kommentit</p>
          {negativeComments.map((comment) => (
            <CommentCard
              key={comment.content}
              comment={comment}
              MAX_WORDS={MAX_WORDS}
            />
          ))}
        </div>
        <div>
          <p>Neutraalit kommentit</p>
          {neutralComments.map((comment) => (
            <CommentCard
              key={comment.content}
              comment={comment}
              MAX_WORDS={MAX_WORDS}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseComments;
