import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button'; // Assuming you have a Button component

const LessonDetailView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  // Mock Data for Lessons (should ideally come from a shared context or API)
  const lessons = [
    {
      id: 1,
      title: 'Understanding Carbon Footprint',
      description: 'A carbon footprint is the total greenhouse gas (GHG) emissions caused by an individual, event, organization, or product, expressed as carbon dioxide equivalent. It is a measure of the impact human activities have on the environment in terms of the amount of greenhouse gases produced, measured in units of carbon dioxide. Understanding your carbon footprint is the first step towards reducing it and contributing to a healthier planet. This lesson will cover the sources of carbon emissions, how to calculate your footprint, and practical strategies for reduction.',
      multimedia: 'https://images.unsplash.com/photo-1582719471384-892fcf16f0d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // New Unsplash image
      quiz: 'What is the primary greenhouse gas associated with human activities?',
      category: 'Climate Science',
      content: [
        { type: 'paragraph', text: 'Greenhouse gases, suchs as carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O), trap heat in the Earth\'s atmosphere, leading to global warming. Human activities like burning fossil fuels, deforestation, and industrial processes significantly increase these gases.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1517999144091-3dff08879793?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Greenhouse gases' }, // New Unsplash image
        { type: 'paragraph', text: 'Calculating your carbon footprint involves assessing emissions from transportation, home energy use, diet, and consumption habits. Many online calculators can help you estimate your impact.' },
        { type: 'paragraph', text: 'Strategies for reduction include: using public transport or cycling, switching to renewable energy providers, reducing meat consumption, buying local products, and recycling.' },
      ],
    },
    {
      id: 2,
      title: 'Renewable Energy Basics',
      description: 'Explore different types of renewable energy sources like solar, wind, and hydro, and their role in a sustainable future.',
      multimedia: 'https://images.unsplash.com/photo-1562870716-bf309057340f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // New Unsplash image
      quiz: 'Which renewable energy source is derived from the sun?',
      category: 'Energy',
      content: [
        { type: 'paragraph', text: 'Renewable energy comes from natural sources that replenish faster than they are depleted. The main types include solar, wind, hydro, geothermal, and biomass.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1509391300000-3d3d3d3d3d3d?q=80&w=2070&auto=format&fit&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Solar panels' }, // New Unsplash image
        { type: 'paragraph', text: 'Solar power harnesses sunlight using photovoltaic panels or concentrated solar power systems. It is versatile and can be used for electricity generation, water heating, and even cooking.' },
        { type: 'paragraph', text: 'Wind power uses wind turbines to convert wind energy into electricity. Wind farms can be onshore or offshore, providing a clean and abundant energy source.' },
      ],
    },
    {
      id: 3,
      title: 'Sustainable Living Practices',
      description: 'Discover everyday habits and choices that contribute to a more sustainable lifestyle, from diet to transportation.',
      multimedia: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Existing Unsplash image (working)
      quiz: 'Name one sustainable practice you can adopt today.',
      category: 'Lifestyle',
      content: [
        { type: 'paragraph', text: 'Sustainable living is about reducing your personal and societal environmental impact. It involves making conscious choices in various aspects of life.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1517999144091-3dff08879793?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Sustainable practices' }, // New Unsplash image
        { type: 'paragraph', text: 'Key areas include: reducing consumption, reusing items, recycling, composting, conserving water and energy, choosing sustainable transportation, and supporting ethical businesses.' },
        { type: 'paragraph', text: 'Even small changes, like using reusable bags or turning off lights, can collectively make a big difference.' },
      ],
    },
    {
      id: 4,
      title: 'The Importance of Biodiversity',
      description: 'Understand why biodiversity is crucial for ecosystem health and human well-being, and threats it faces.',
      multimedia: 'https://images.unsplash.com/photo-1586368984170-1a2d0f2d0f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // New Unsplash image
      quiz: 'What is biodiversity?',
      category: 'Ecology',
      content: [
        { type: 'paragraph', text: 'Biodiversity refers to the variety of life on Earth at all its levels, from genes to ecosystems. It is essential for maintaining ecological balance and providing ecosystem services.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1517999144091-3dff08879793?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Biodiversity' }, // New Unsplash image
        { type: 'paragraph', text: 'Threats to biodiversity include habitat loss, climate change, pollution, invasive species, and overexploitation of resources.' },
        { type: 'paragraph', text: 'Protecting biodiversity is crucial for food security, medicine, clean water, and a stable climate.' },
      ],
    },
  ];

  const lesson = lessons.find((l) => l.id === parseInt(lessonId || '', 10));

  if (!lesson) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Lesson Not Found</h1>
        <p className="text-gray-700 mt-4">The lesson you are looking for does not exist.</p>
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{lesson.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>

        {lesson.multimedia && (
          <div className="mb-8">
            <img src={lesson.multimedia} alt={lesson.title} className="w-full h-96 object-cover rounded-lg" />
          </div>
        )}

        <div className="prose max-w-none"> {/* Using prose for better typography, assuming @tailwindcss/typography is installed */}
          {lesson.content?.map((block, index) => (
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

        {lesson.quiz && (
          <Card className="mt-8 p-6 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800">Quick Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-green-700">{lesson.quiz}</p>
              <Link to={`/quiz/${lesson.id}`}> {/* Wrap Button with Link */}
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Take Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonDetailView;
