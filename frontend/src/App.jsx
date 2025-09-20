import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LearningPage from './pages/LearningPage';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/learn" element={<LearningPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
