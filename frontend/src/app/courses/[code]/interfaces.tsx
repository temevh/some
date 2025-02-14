interface Course {
  code: string;
  name: string;
  school: string;
  lastUpdate: string;
  rating: string;
  teaching: string;
  difficulty: string;
  workload: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  courseCode: string;
  course: Course;
  content: string;
  createdAt: string;
  sentiment: number;
}

interface Rating {
  rating: string;
  teaching: string;
  difficulty: string;
  workload: string;
}

export type { Course, Comment, Rating };
