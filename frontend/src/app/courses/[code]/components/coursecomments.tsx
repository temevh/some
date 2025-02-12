import CommentCard from "./commentcard";
import { useMobile } from "@/context/mobilecontext";

const MAX_WORDS = 10;

const CourseComments = ({ comments }) => {
  const isMobile = useMobile();

  if (comments.length === 0) {
    return <p>Ei kommentteja kurssista</p>;
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
      <p>Positiiviset kommentit</p>
      <p>Kriittiset kommentit</p>
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
};

export default CourseComments;
