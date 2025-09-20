import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Award, PlayCircle } from 'lucide-react'; // Import PlayCircle icon
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // Import Card components

const QuizPage = () => {
  // Mock Quiz Data
  const quizzes = [
    {
      id: 1,
      title: 'Carbon Footprint Challenge',
      description: 'Test your knowledge on carbon footprints, their sources, and reduction strategies.',
      questions: [
        {
          question: 'What is the primary greenhouse gas associated with human activities?',
          options: ['Methane', 'Carbon Dioxide', 'Nitrous Oxide', 'Water Vapor'],
          correctAnswer: 'Carbon Dioxide',
        },
        {
          question: 'Which activity contributes most to an individual\'s carbon footprint?',
          options: ['Recycling', 'Driving a car', 'Eating local food', 'Using LED lights'],
          correctAnswer: 'Driving a car',
        },
        {
          question: 'What does "carbon neutral" mean?',
          options: ['Producing no carbon emissions', 'Offsetting all carbon emissions', 'Reducing carbon emissions by 50%', 'Only using renewable energy'],
          correctAnswer: 'Offsetting all carbon emissions',
        },
      ],
    },
    {
      id: 2,
      title: 'Renewable Energy Explorer',
      description: 'How well do you know the different types of renewable energy and their benefits?',
      questions: [
        {
          question: 'Which of these is NOT a renewable energy source?',
          options: ['Solar', 'Coal', 'Wind', 'Hydroelectric'],
          correctAnswer: 'Coal',
        },
        {
          question: 'What is the main advantage of solar energy?',
          options: ['It\'s always available', 'It\'s very cheap to install', 'It produces no greenhouse gases during operation', 'It works well at night'],
          correctAnswer: 'It produces no greenhouse gases during operation',
        },
        {
          question: 'Geothermal energy harnesses heat from where?',
          options: ['The sun', 'The ocean', 'The Earth\'s interior', 'Volcanoes only'],
          correctAnswer: 'The Earth\'s interior',
        },
      ],
    },
    {
      id: 3,
      title: 'Sustainable Living Habits',
      description: 'Discover if your daily habits align with sustainable living principles.',
      questions: [
        {
          question: 'Which of these is a good way to conserve water at home?',
          options: ['Taking long showers', 'Leaving the tap running while brushing teeth', 'Collecting rainwater for gardening', 'Washing clothes in small loads'],
          correctAnswer: 'Collecting rainwater for gardening',
        },
        {
          question: 'What is the "reduce" principle in "Reduce, Reuse, Recycle"?',
          options: ['Buying more items', 'Minimizing the amount of waste you produce', 'Finding new uses for old items', 'Sorting waste for collection'],
          correctAnswer: 'Minimizing the amount of waste you produce',
        },
        {
          question: 'Which mode of transport has the lowest carbon footprint for short distances?',
          options: ['Car', 'Bus', 'Bicycle', 'Motorcycle'],
          correctAnswer: 'Bicycle',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Test Your Climate Knowledge!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Challenge yourself with fun quizzes and see how much you've learned about climate change and sustainability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{quiz.title}</CardTitle>
                <CardDescription className="text-gray-600">{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/quiz/${quiz.id}`}>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50">
          <Award className="w-5 h-5 mr-2" />
          Review Past Quizzes (Coming Soon!)
        </Button>
      </section>
    </div>
  );
};

export default QuizPage;
