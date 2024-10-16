import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`max-w-5xl outline mx-auto max-h-fit my-4 items-center  ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
