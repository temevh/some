import { Card } from "@/app/components/ui/card";

const CourseComments = ({ comments }) => {
  return (
    <div className="text-center">
      <p className="text-black text-xl mb-4">Mitä ihmiset sanovat kurssista</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {comments.map((comment) => {
          return (
            <Card
              key={comment.content}
              className="p-2 flex flex-col justify-between"
            >
              <p>{comment.content}</p>
              <div className="text-right text-gray-500 text-sm mt-2">
                <p>{new Date(comment.createdAt).toLocaleDateString("fi-FI")}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseComments;
