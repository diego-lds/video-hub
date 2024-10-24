import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card as CustomCard,
} from "@/components/ui/card";
import Image from "next/image";
interface Card {
  title: string;
  description: string;
  imagePath: string;
}

const Card: React.FC<Card> = ({ title, description, imagePath }) => {
  return (
    <CustomCard className="w-full p-2 max-w-sm mx-auto overflow-hidden rounded-lg shadow-md">
      <div className="relative  w-full  aspect-auto sm:aspect-video ">
        <Image
          src={imagePath || "/placeholder.png"}
          alt={title}
          width={382}
          height={241}
          className=" object-cover w-full max-h-64 sm:h-full"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold mb-2 line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
    </CustomCard>
  );
};

export default Card;
