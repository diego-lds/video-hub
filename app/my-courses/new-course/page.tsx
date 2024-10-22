import NewCourseForm from "@/components/NewCourseForm";

export default async function NewCourse() {
  return (
    <div>
      <h1 className="text-3xl">Criar novo curso</h1>
      <NewCourseForm />
    </div>
  );
}
