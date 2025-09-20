import { Leaf, Sparkles, Menu, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import earthMascot from "@/assets/earth-mascot.png";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/services/api'; // Changed import statement

const Header = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with the actual user ID
        const userId = 1;
        const response = await api.get(`/user/${userId}`);
        setPoints(response.data.points);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={earthMascot}
                alt="EcoLearn Mascot"
                className="w-12 h-12 rounded-full animate-float"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center animate-bounce-gentle">
                <Sparkles className="w-2 h-2 text-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white bg-green-500">
                EcoLearn AI
              </h1>
              <p className="text-xs text-muted-foreground">Climate Education for Young Minds</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/learn">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Leaf className="w-4 h-4 mr-2" />
                Learn
              </Button>
            </Link>
            <Link to="/chat"> {/* Wrap AI Chat button with Link */}
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
            </Link>
            <Link to="/badges">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Star className="w-4 h-4 mr-2" />
                Badges
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{points}</span>
            </div>
            <Link to="/login">
              <Button variant="nature" size="sm">
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;