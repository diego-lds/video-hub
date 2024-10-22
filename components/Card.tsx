import {
  CardContent,
  CardDescription,
  CardFooter,
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
    <CustomCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ">
      <CardHeader className="  sm:p-6">
        <Image
          width={350}
          height={200}
          src={imagePath || "/placeholder.png"}
          alt={title}
          className=" object-cover -auto  rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-md sm:text-xl md:text-xl font-bold mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
    </CustomCard>
  );
};

export default Card;
