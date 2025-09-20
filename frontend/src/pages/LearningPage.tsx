import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import api from '@/services/api'; // Import the API client

const LearningPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lessons (mock data for now, ideally from API)
        const mockLessons = [
          {
            id: 1,
            title: 'Understanding Carbon Footprint',
            description: 'Learn what a carbon footprint is and why it matters. Discover practical ways to reduce your environmental impact.',
            multimedia: 'https://images.unsplash.com/photo-1582719471384-892fcf16f0d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Climate Science',
            quizId: 1, // Assign quiz ID
          },
          {
            id: 2,
            title: 'Renewable Energy Basics',
            description: 'Explore different types of renewable energy sources like solar, wind, and hydro, and their role in a sustainable future.',
            multimedia: 'https://images.unsplash.com/photo-1562870716-bf309057340f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Energy',
            quizId: 2, // Assign quiz ID
          },
          {
            id: 3,
            title: 'Sustainable Living Practices',
            description: 'Discover everyday habits and choices that contribute to a more sustainable lifestyle, from diet to transportation.',
            multimedia: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Lifestyle',
            quizId: 3, // Assign quiz ID
          },
          {
            id: 4,
            title: 'The Importance of Biodiversity',
            description: 'Understand why biodiversity is crucial for ecosystem health and human well-being, and threats it faces.',
            multimedia: 'https://images.unsplash.com/photo-1586368984170-1a2d0f2d0f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Ecology',
            quizId: null, // No quiz for this lesson
          },
        ];
        setLessons(mockLessons);

        // Fetch quizzes from API
        const quizzesResponse = await api.get('/quiz');
        setQuizzes(quizzesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  // Mock Data for Topics (can be expanded with multimedia, etc.)
  const topics = [
    {
      id: 101,
      title: 'Climate Change Fundamentals',
      description: 'Key concepts, scientific consensus, and impacts of climate change on our planet.',
      multimedia: 'https://images.unsplash.com/photo-1542601906-661609f3739a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 102,
      title: 'Waste Reduction and Recycling',
      description: 'Effective strategies for minimizing waste, proper recycling techniques, and the circular economy.',
      multimedia: 'https://images.unsplash.com/photo-1532921620360-205112fefd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 103,
      title: 'Water Conservation',
      description: 'The importance of water, global water scarcity, and practical methods for conserving water at home and in industry.',
      multimedia: 'https://images.unsplash.com/photo-1508849151020-84010a046077?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 104,
      title: 'Sustainable Agriculture',
      description: 'Exploring farming practices that are environmentally friendly, economically viable, and socially just.',
      multimedia: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const categories = Array.from(new Set(lessons.map(lesson => lesson.category)));

  const filteredLessons = selectedCategory
    ? lessons.filter(lesson => lesson.category === selectedCategory)
    : lessons;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-blue-500 text-white py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Dive Deep into Eco-Knowledge</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore engaging lessons and insightful topics to empower your journey towards a sustainable future.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Start Learning Now
          </button>
        </div>
      </section>

      <div className="container mx-auto p-8">
        {/* Category Filter */}
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-2 rounded-full"
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardHeader>
                  <img src={lesson.multimedia} alt={lesson.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                  <CardTitle className="text-2xl font-semibold">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    <Badge variant="secondary" className="mr-2">{lesson.category}</Badge>
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{lesson.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/learn/${lesson.id}`} className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors block text-center">
                      View Lesson
                    </Link>
                    {lesson.quizId && (
                      <Link to={`/quiz/${lesson.quizId}`} className="w-1/2 ml-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors block text-center">
                        Take Quiz
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Topics Section */}
        <section>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardHeader>
                  <img src={topic.multimedia} alt={topic.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                  <CardTitle className="text-2xl font-semibold">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{topic.description}</p>
                  <Link to={`/learn/topics/${topic.id}`} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors block text-center">
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningPage;