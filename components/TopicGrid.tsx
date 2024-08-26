import React from "react";

interface Topic {
  icon: string;
  topic: string;
}

interface TopicGridProps {
  title: string;
  topics: Topic[];
}

const TopicGrid: React.FC<TopicGridProps> = ({ title, topics }) => {
  return (
    <div className="max-w-3xl  p-6 rounded-sm  border border-gray-300">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">{topic.icon}</span>
            <span>{topic.topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicGrid;
