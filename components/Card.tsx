import {
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
    <CustomCard>
      <Image
        width={300}
        height={200}
        src={imagePath || "/placeholder.png"}
        alt={title}
        className=" object-fit sm:h-56 lg:h-64"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
    </CustomCard>
  );
};

export default Card;
