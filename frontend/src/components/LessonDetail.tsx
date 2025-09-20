import React from 'react';

interface LessonDetailProps {
  title: string;
  description: string;
  multimedia: string; // URL for an image or video
  quiz: string; // Placeholder for quiz content
}

const LessonDetail: React.FC<LessonDetailProps> = ({ title, description, multimedia, quiz }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      {multimedia && <img src={multimedia} alt={`${title} visual content`} className="mb-4 rounded" />}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Quiz</h4>
        <p>{quiz}</p>
        {/* Placeholder for quiz interaction */}
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Take Quiz</button>
      </div>
    </div>
  );
};

export default LessonDetail;