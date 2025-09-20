import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const TopicDetailView: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  // Mock Data for Topics (should ideally come from a shared context or API)
  const topics = [
    {
      id: 101,
      title: 'Climate Change Fundamentals',
      description: 'Key concepts, scientific consensus, and impacts of climate change on our planet.',
      multimedia: 'https://images.unsplash.com/photo-1542601906-661609f3739a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: [
        { type: 'paragraph', text: 'Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels (like coal, oil, and gas), which produces heat-trapping gases.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1536939400350-b5e5e5e5e5e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Global warming graph' },
        { type: 'paragraph', text: 'The scientific consensus is clear: the Earth\'s climate is warming at an unprecedented rate. This warming is unequivocally caused by human activities, leading to more frequent and intense heatwaves, rising sea levels, and changes in precipitation patterns.' },
        { type: 'paragraph', text: 'Impacts include: extreme weather events, disruptions to ecosystems, threats to food security, and increased health risks. Addressing climate change requires global cooperation and a transition to sustainable practices.' },
      ],
    },
    {
      id: 102,
      title: 'Waste Reduction and Recycling',
      description: 'Effective strategies for minimizing waste, proper recycling techniques, and the circular economy.',
      multimedia: 'https://images.unsplash.com/photo-1532921620360-205112fefd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: [
        { type: 'paragraph', text: 'Waste reduction is the practice of minimizing the amount of waste produced. This is the most effective way to manage waste, as it prevents the creation of waste in the first place. It involves conscious consumption, choosing durable products, and avoiding single-use items.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1517999144091-3dff08879793?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Recycling bins' },
        { type: 'paragraph', text: 'Recycling is the process of converting waste materials into new materials and objects. Proper recycling involves sorting materials correctly and understanding local recycling guidelines. Common recyclable materials include paper, plastic, glass, and metal.' },
        { type: 'paragraph', text: 'The circular economy is an economic system aimed at eliminating waste and the continual use of resources. It involves designing products for durability, reuse, and recycling, keeping materials in use for as long as possible.' },
      ],
    },
    {
      id: 103,
      title: 'Water Conservation',
      description: 'The importance of water, global water scarcity, and practical methods for conserving water at home and in industry.',
      multimedia: 'https://images.unsplash.com/photo-1508849151020-84010a046077?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: [
        { type: 'paragraph', text: 'Water is a finite resource essential for all life. Despite covering 71% of the Earth\'s surface, only a small fraction is fresh water available for human use. Global water scarcity is a growing concern due to population growth, pollution, and climate change.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1509391300000-3d3d3d3d3d3d?q=80&w=2070&auto=format&fit&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Water droplets' },
        { type: 'paragraph', text: 'At home, conserve water by: fixing leaks, taking shorter showers, using water-efficient appliances, and watering plants efficiently. In industry, water conservation involves optimizing processes, reusing wastewater, and implementing water-saving technologies.' },
        { type: 'paragraph', text: 'Every drop counts. Collective efforts in water conservation are vital for ensuring sustainable water resources for future generations.' },
      ],
    },
    {
      id: 104,
      title: 'Sustainable Agriculture',
      description: 'Exploring farming practices that are environmentally friendly, economically viable, and socially just.',
      multimedia: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: [
        { type: 'paragraph', text: 'Sustainable agriculture is a way of farming that is committed to producing food in a manner that is healthy for the environment, protects public health, is humane for animals, and provides fair wages for farmworkers. It focuses on long-term sustainability rather than short-term gains.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1518700938150-c716710f237f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Sustainable farm' },
        { type: 'paragraph', text: 'Key practices include: crop rotation, cover cropping, reduced tillage, integrated pest management, and efficient water use. These practices help maintain soil health, reduce erosion, and minimize reliance on synthetic inputs.' },
        { type: 'paragraph', text: 'Sustainable agriculture also considers the social and economic well-being of farmers and rural communities, promoting fair trade and local food systems.' },
      ],
    },
  ];

  const topic = topics.find((t) => t.id === parseInt(topicId || '', 10));

  if (!topic) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Topic Not Found</h1>
        <p className="text-gray-700 mt-4">The topic you are looking for does not exist.</p>
        <Link to="/learn" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Back to Learning Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <Link to="/learn" className="text-blue-600 hover:underline mb-6 block">
          &larr; Back to Learning Hub
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{topic.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{topic.description}</p>

        {topic.multimedia && (
          <div className="mb-8">
            <img src={topic.multimedia} alt={topic.title} className="w-full h-96 object-cover rounded-lg" />
          </div>
        )}

        <div className="prose max-w-none"> {/* Using prose for better typography, assuming @tailwindcss/typography is installed */}
          {topic.content?.map((block, index) => (
            <React.Fragment key={index}>
              {block.type === 'paragraph' && <p className="mb-4 text-gray-700">{block.text}</p>}
              {block.type === 'image' && (
                <div className="mb-4">
                  <img src={block.src} alt={block.alt} className="w-full h-64 object-cover rounded-lg" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetailView;