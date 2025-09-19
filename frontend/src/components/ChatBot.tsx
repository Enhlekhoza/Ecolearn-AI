import { useState } from "react";
import { MessageCircle, Send, Sparkles, TreePine, Recycle, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sendMessage } from "../services/chat";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi there! I'm your climate buddy! 🌍 Ask me anything about climate change, renewable energy, or how to help our planet!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    { icon: TreePine, text: "How do trees help fight climate change?" },
    { icon: Recycle, text: "What can I recycle at home?" },
    { icon: Wind, text: "How do wind turbines work?" },
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendMessage({ message: inputValue });
      const botMessage = { type: "bot", content: response.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { type: "bot", content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <Card className="h-[500px] flex flex-col shadow-soft border-primary/10">
      {/* Header */}
      <div className="p-4 border-b bg-primary/5 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-primary animate-glow" />
            <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1 animate-bounce-gentle" />
          </div>
          <h3 className="font-semibold text-primary">Climate AI Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm animate-glow"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground rounded-bl-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Sample Questions */}
      <div className="p-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="chat"
              size="sm"
              onClick={() => handleSampleQuestion(question.text)}
              className="text-xs"
            >
              <question.icon className="w-3 h-3 mr-1" />
              {question.text}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about climate change..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} variant="nature" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;