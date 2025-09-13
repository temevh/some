import { Course } from "@/app/courses/[code]/interfaces";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getInitialCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE}/courses/initial`);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    return data.map((course: Course) => ({
      ...course,
      school: course.school || "Unknown",
    }));
  } catch (err) {
    console.error("Error fetching initial courses:", err);
    return [];
  }
};

export const getFilteredCourses = async (
  school: string | null,
  searchTerm: string
) => {
  try {
    const response = await axios.get(`${API_BASE}/courses/filtered`, {
      params: { school, searchTerm: searchTerm.toLowerCase() },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching filtered courses:", err);
    return [];
  }
};

export const getMoreComments = async (
  courseCode: string,
  sentiment: string,
  toSkip: number
) => {
  try {
    const response = await axios.get(`${API_BASE}/courses/comments`, {
      params: { courseCode, sentiment, toSkip },
    });
    return response.data || [];
  } catch (err) {
    console.error("Error fetching more comments:", err);
    return [];
  }
};

export const addCourse = async (course: Course) => {
  try {
    const response = await axios.post(`${API_BASE}/courses/addcourse`, course);

    return response.data || null;
  } catch (err) {
    console.error("Error adding course");
    return null;
  }
};

export const getCourseInfo = async (code: string): Promise<Course | null> => {
  try {
    const response = await axios.get(`${API_BASE}/courses/course/`, {
      params: { code },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching course info:", err);
    return null;
  }
};

export const sendCourseRating = async (
  courseCode: string,
  ratings: {
    rating: number;
    teaching: number;
    difficulty: number;
    workload: number;
  },
  comment?: string,
  recaptchaToken?: string
): Promise<
  | boolean
  | { courseCode: String; ratings: []; comment: String; recaptchaToken: String }
> => {
  //TODO: change from any to something
  try {
    const response = await axios.post(`${API_BASE}/courses/rate`, {
      courseCode,
      ratings,
      comment,
      recaptchaToken,
    });
    return response.data;
  } catch (err) {
    console.error("Error sending course rating:", err);
    return false;
  }
};
