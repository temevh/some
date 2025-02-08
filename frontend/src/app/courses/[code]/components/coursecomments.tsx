import CommentCard from "./commentcard";

const MAX_WORDS = 10;

const CourseComments = ({ comments }) => {
  if (comments.length === 0) {
    return <p>Ei kommentteja kurssista</p>;
  }

  return (
    <div className="text-center">
      <p className="text-black text-xl mb-4">Mitä ihmiset sanovat kurssista</p>
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
