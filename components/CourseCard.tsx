import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  imagePath: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imagePath,
}) => {
  return (
    <div className="bg-white h-96 p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200">
      <Image
        width={300}
        height={200}
        src={imagePath || "/placeholder.png"}
        alt={title}
        className=" object-cover h-auto w-auto  relative"
      />

      <div className="mt-3">
        <h3 className="">{title}</h3>
        <p className="line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
