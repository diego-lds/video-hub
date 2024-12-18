// Tipos relacionados ao curso
export interface Lesson {
  id: number;
  created_at: string;
  title: string;
  description: string;
  video_path: string;
  order: number | null;
  duration: number | null;
  course_id: number;
}

export interface Topic {
  id: number;
  course_id: string;
  topic: string;
}

export interface Params {
  params: {
    id: string;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export interface CourseInfoFormProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface ImageUploaderProps {
  currentImage: string | null;
  previewImage: string | null;
  onImageChange: (file: File) => void;
}

export interface TopicsListProps {
  topics: Topic[];
  onAddTopic: (topic: string) => void;
  onDeleteTopic: (topicId: string) => void;
}

export interface LessonsListProps {
  lessons: Lesson[];
  courseId: number;
}



export interface AddTopicResult {
  data: Topic[] | null;
  error: Error | null;
}

export interface DeleteTopicResult {
  error: Error | null;
}

export interface UpdateCourseDetailsResult {
  error: Error | null;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UserContextType {
  user: User | null;
  setUser: SetState<User | null>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
