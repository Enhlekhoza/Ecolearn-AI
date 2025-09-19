import { useState } from "react";
import { Lightbulb, ArrowRight, Leaf, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import climateActions from "@/assets/climate-actions.png";

const ClimateFactsCard = () => {
  const facts = [
    {
      icon: Leaf,
      title: "Trees are Climate Heroes!",
      fact: "One tree can absorb 48 pounds of CO2 per year and produce enough oxygen for 2 people!",
      tip: "Plant a tree or help take care of plants in your community!",
      color: "text-primary"
    },
    {
      icon: Droplets,
      title: "Water is Precious",
      fact: "Turning off the tap while brushing teeth can save up to 8 gallons of water per day!",
      tip: "Take shorter showers and fix leaky faucets to help conserve water!",
      color: "text-secondary"
    },
    {
      icon: Sun,
      title: "Solar Power is Amazing!",
      fact: "The sun gives us more energy in one hour than humans use in an entire year!",
      tip: "Look for solar panels in your neighborhood and learn how they work!",
      color: "text-accent"
    }
  ];

  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const fact = facts[currentFact];
  const IconComponent = fact.icon;

  return (
    <Card className="p-6 shadow-soft border-accent/10 bg-gradient-to-br from-card to-muted/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-accent animate-bounce-gentle" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Climate Facts & Tips</h3>
      </div>

      {/* Image */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <img 
          src={climateActions} 
          alt="Climate friendly actions" 
          className="w-full h-24 object-cover"
        />
      </div>

      {/* Current Fact */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <IconComponent className={`w-6 h-6 ${fact.color} flex-shrink-0 mt-1`} />
          <div>
            <h4 className="font-semibold text-foreground mb-2">{fact.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{fact.fact}</p>
            <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
              <p className="text-sm font-medium text-primary">💡 Your Action:</p>
              <p className="text-xs text-foreground mt-1">{fact.tip}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex gap-1">
            {facts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFact ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={nextFact} 
            variant="sunshine" 
            size="sm"
            className="animate-glow"
          >
            Next Tip
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClimateFactsCard;