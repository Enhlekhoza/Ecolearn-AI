import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import LearningPage from "./pages/LearningPage";
import LessonDetailView from "./pages/LessonDetailView";
import QuizTakingPage from "./pages/QuizTakingPage";
import TopicDetailView from "./pages/TopicDetailView"; // Import TopicDetailView
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:quizId" element={<QuizTakingPage />} />
          <Route path="/learn" element={<LearningPage />} />
          <Route path="/learn/:lessonId" element={<LessonDetailView />} />
          <Route path="/learn/topics/:topicId" element={<TopicDetailView />} /> {/* Add Topic Detail Route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
