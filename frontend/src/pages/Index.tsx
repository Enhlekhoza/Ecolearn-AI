import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
import CarbonCalculator from "@/components/CarbonCalculator";
import ClimateFactsCard from "@/components/ClimateFactsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Users, Award } from "lucide-react";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-nature">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Learn Climate Science with AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover how to protect our planet through interactive learning, AI-powered conversations, 
            and fun activities designed just for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn">
              <Button variant="nature" size="xl" className="animate-glow">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="sunshine" size="xl">
                <Target className="w-5 h-5 mr-2" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center shadow-soft border-primary/10 hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">10,000+</h3>
            <p className="text-sm text-muted-foreground">Young Climate Heroes</p>
          </Card>
          
          <Card className="p-6 text-center shadow-soft border-secondary/10 hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-secondary mb-2">500+</h3>
            <p className="text-sm text-muted-foreground">AI Conversations Daily</p>
          </Card>
          
          <Card className="p-6 text-center shadow-soft border-accent/10 hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-accent mb-2">95%</h3>
            <p className="text-sm text-muted-foreground">Feel More Confident</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* AI Chatbot */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary animate-glow" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Chat with Climate AI</h3>
                <p className="text-sm text-muted-foreground">Ask anything about our planet!</p>
              </div>
            </div>
            <ChatBot />
          </div>

          {/* Calculator & Facts */}
          <div className="space-y-6">
            <CarbonCalculator />
            <ClimateFactsCard />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-card/60 rounded-2xl border border-border/50 shadow-soft">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Become a Climate Hero? 🌍
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of young learners making a difference for our planet every day!
          </p>
          <Button variant="nature" size="xl" className="animate-bounce-gentle">
            Start Your Climate Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
