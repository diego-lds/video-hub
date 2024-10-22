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
    <CustomCard className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={imagePath || "/placeholder.png"}
          alt={title}
          sizes="16rem"
          layout="fill"
          objectFit="cover"
          className="absolute object-cover h-64 inset-0"
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
