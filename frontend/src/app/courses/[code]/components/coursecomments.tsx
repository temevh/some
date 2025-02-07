import CommentCard from "./commentcard";

const MAX_WORDS = 22;

const CourseComments = ({ comments }) => {
  if (comments.length === 0) {
    return <p>Ei kommentteja kurssista</p>;
  }

  return (
    <div className="text-center">
      <p className="text-black text-xl mb-4">Mitä ihmiset sanovat kurssista</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
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
