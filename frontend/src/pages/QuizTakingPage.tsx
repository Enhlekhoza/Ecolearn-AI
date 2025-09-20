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
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number | null }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
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
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">Loading Quiz...</h1>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answers.find((a: any) => a.isCorrect);

  const handleAnswerSelect = (value: string) => {
    const answerId = parseInt(value);
    setSelectedAnswerId(answerId);
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));
    setShowFeedback(false); // Reset feedback when a new answer is selected
  };

  const handleSubmitAnswer = () => {
    // Add a check here to ensure correctAnswer is defined
    if (correctAnswer && selectedAnswerId === correctAnswer.id) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = async () => {
    // If it's the last question, submit the quiz
    if (currentQuestionIndex === quiz.questions.length - 1) {
      try {
        const response = await api.post(`/quiz/${quizId}/submit`, { answers: userAnswers });
        setScore(response.data.score);
        setQuizCompleted(true);
        toast.success(`You earned ${Math.round(response.data.score / 10)} points!`);
      } catch (error: any) {
        console.error('Failed to submit quiz', error);
        const errorMessage = error.response?.data?.error || 'Failed to submit quiz';
        toast.error(errorMessage);
      }
    }
    else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null); // Clear selected answer for next question
      setShowFeedback(false); // Hide feedback for next question
      setIsCorrectAnswer(false); // Reset correctness for next question
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
                onValueChange={handleAnswerSelect}
                value={selectedAnswerId?.toString() || ''}
                className="space-y-4"
              >
                {currentQuestion.answers.map((option: any) => (
                  <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="text-lg flex-grow cursor-pointer">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>

              {showFeedback && (
                <div className={`mt-6 p-4 rounded-md flex items-center space-x-2 ${isCorrectAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isCorrectAnswer ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <p className="font-medium">
                    {isCorrectAnswer ? 'Correct!' : `Incorrect. The correct answer was: ${correctAnswer?.text}`}
                  </p>
                </div>
              )}
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
        <CardFooter className="flex justify-between mt-6">
          {!quizCompleted && (
            <>
              {!showFeedback ? (
                <Button onClick={handleSubmitAnswer} disabled={selectedAnswerId === null} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="bg-green-500 hover:bg-green-600 text-white">
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizTakingPage;