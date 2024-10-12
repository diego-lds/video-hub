import React from "react";

interface Topic {
  topic: string;
}

interface TopicGridProps {
  topics: Topic[] | null;
}

const TopicGrid: React.FC<TopicGridProps> = ({ topics }) => {
  return (
    <div className="max-w-3xl  p-6 rounded-sm  border border-gray-300">
      <h2 className="text-2xl font-bold mb-8">O que você irá aprender</h2>
      <div className="grid grid-cols-2 gap-4">
        {topics?.map((topic, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">✅</span>
            <span>{topic.topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicGrid;
