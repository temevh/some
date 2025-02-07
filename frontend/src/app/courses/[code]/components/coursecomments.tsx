import { Card } from "@/app/components/ui/card";

const CourseComments = ({ comments }) => {
  return (
    <div>
      <p className="text-black text-xl">Kommentit</p>
      {comments.map((comment) => {
        return (
          <Card>
            <p key={comment.content}>{comment.content}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseComments;
