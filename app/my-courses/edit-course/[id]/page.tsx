import { getCourseAction } from "@/app/actions/courses";
import { getLessonsAction } from "@/app/actions/lessons";
import { getCourseTopicsAction } from "@/app/actions/topics";
import EditCourseForm from "@/components/EditCourseForm";


export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourse(params?.id);
  const lessons = await getLessons(params?.id);
  const topics= await getTopics(params?.id);



  return (
    <>
      {course && lessons && topics && (
        <EditCourseForm course={course} lessons={lessons} topics={topics} />
      )}
    </>
  );
}

async function getCourse(id: string) {
  const { data,error } = await getCourseAction(id);
  if(error){
    console.error(error)
  }
  return data;
}

async function getLessons(id: string) {
  const { data, error } = await getLessonsAction(id);
  if(error){
    console.error(error)
  }
  return data;
}

async function getTopics(id: string) {
  const { data, error } = await getCourseTopicsAction(id);
  if(error){
    console.error(error)
  }
  return data;
}
