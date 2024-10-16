import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as CustomCard,
} from "@/components/ui/card";
import Image from "./Image";
interface Card {
  title: string;
  description: string;
  imagePath: string;
}

const Card: React.FC<Card> = ({ title, description, imagePath }) => {
  return (
    <CustomCard>
      <Image
        width={362}
        height={192}
        src={imagePath || "/placeholder.png"}
        alt={title}
        className=" object-cover h-48 w-96  relative"
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
