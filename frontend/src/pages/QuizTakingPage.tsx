import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '@/services/api';
import { toast } from 'sonner';

const QuizTakingPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Loading Quiz...</h1>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await api.post(`/quiz/${quizId}/submit`, { answers: selectedAnswers });
      setScore(response.data.score);
      setQuizCompleted(true);
      toast.success(`You earned ${Math.round(response.data.score / 10)} points!`);
    } catch (error) {
      console.error('Failed to submit quiz', error);
      toast.error('Failed to submit quiz');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
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
              <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
              <RadioGroup
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                value={selectedAnswers[currentQuestion.id]?.toString() || ''}
                className="space-y-4"
              >
                {currentQuestion.answers.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="text-lg flex-grow cursor-pointer">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-xl text-gray-700">You scored {score}%</p>
              <Link to="/quiz">
                <Button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white">Back to Quizzes</Button>
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end mt-6">
          {!quizCompleted && (
            <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion.id]} className="bg-green-500 hover:bg-green-600 text-white">
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizTakingPage;