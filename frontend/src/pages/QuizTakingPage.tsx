import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizTakingPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock Quiz Data (should ideally come from a shared context or API)
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

  const quiz = quizzes.find((q) => q.id === parseInt(quizId || '', 10));

  if (!quiz) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Quiz Not Found</h1>
        <p className="text-gray-700 mt-4">The quiz you are looking for does not exist.</p>
        <Link to="/quiz" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    setShowFeedback(false); // Reset feedback when a new answer is selected
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">{quiz.title}</CardTitle>
          <p className="text-center text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <>
              <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
              <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer || ''} className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-lg flex-grow cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {showFeedback && (
                <div className={`mt-6 p-4 rounded-md flex items-center space-x-2 ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <p className="font-medium">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-xl text-gray-700">You scored {score} out of {quiz.questions.length} questions correctly.</p>
              <Link to="/quiz">
                <Button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white">Back to Quizzes</Button>
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between mt-6">
          {!quizCompleted && (
            <>
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer || showFeedback} className="bg-blue-500 hover:bg-blue-600 text-white">
                Submit Answer
              </Button>
              <Button onClick={handleNextQuestion} disabled={!showFeedback && selectedAnswer !== null} className="bg-green-500 hover:bg-green-600 text-white">
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizTakingPage;
