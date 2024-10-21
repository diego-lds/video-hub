import React from "react";
import CustomImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({
  src = "/placeholder.png",
  alt,
  className = "",
  width = 200,
  height = 150,
}) => {
  return (
    <CustomImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default Image;
