import React, { useState } from "react";
import { Topic } from "@/types/course";

interface TopicsListProps {
  topics: Topic[];
  onAddTopic: (topic: string) => void;
  onDeleteTopic: (topicId: string) => void;
}

const TopicsList: React.FC<TopicsListProps> = ({
  topics,
  onAddTopic,
  onDeleteTopic,
}) => {
  const [newTopic, setNewTopic] = useState<string>("");

  const handleAddTopic = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTopic) {
      onAddTopic(newTopic);
      setNewTopic("");
    }
  };

  return (
    <div className="mt-10 bg-white rounded-lg shadow-md p-6 space-y-3">
      <label className="block text-xl font-medium mb-4">
        Tópicos de aprendizagem:
      </label>
      <ul className="space-y-2">
        {topics?.map((topic) => (
          <li
            key={topic.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
          >
            {topic.topic}
            <a
              onClick={() => topic.id && onDeleteTopic(topic.id)}
              className="text-red-600 hover:text-red-800 cursor-pointer transition"
            >
              ❌️
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="flex-1 py-2 px-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Adicionar tópico"
        />
        <button
          onClick={handleAddTopic}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Adicionar tópico
        </button>
      </div>
    </div>
  );
};

export default TopicsList;
