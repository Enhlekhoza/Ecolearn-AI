import { useState } from "react";
import { Calculator, Car, Home, Utensils, TrendingDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import api from "@/services/api";
import { toast } from "sonner";

const CarbonCalculator = () => {
  const [transport, setTransport] = useState([5]);
  const [energy, setEnergy] = useState([3]);
  const [food, setFood] = useState([4]);
  const [tips, setTips] = useState([]);
  const [showTips, setShowTips] = useState(false);

  // Simple calculation for demo purposes
  const totalFootprint = (transport[0] + energy[0] + food[0]) * 0.5;

  const getFootprintLevel = (footprint: number) => {
    if (footprint < 4) return { level: "Great!", color: "text-primary", message: "You're doing amazing for the planet! 🌱" };
    if (footprint < 7) return { level: "Good", color: "text-accent", message: "Nice work! A few changes could help even more! 🌿" };
    return { level: "Can Improve", color: "text-secondary", message: "There's room to help our planet more! 🌍" };
  };

  const footprintInfo = getFootprintLevel(totalFootprint);

  const getTips = async () => {
    let category = 'General';
    if (transport[0] > energy[0] && transport[0] > food[0]) {
      category = 'Transport';
    } else if (energy[0] > transport[0] && energy[0] > food[0]) {
      category = 'Energy';
    } else if (food[0] > transport[0] && food[0] > energy[0]) {
      category = 'Food';
    }

    try {
      const response = await api.get(`/tips?category=${category}`);
      setTips(response.data);
      setShowTips(true);
    } catch (error) {
      console.error('Failed to fetch tips', error);
      toast.error('Failed to fetch tips');
    }
  };

  return (
    <Card className="p-6 shadow-soft border-secondary/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-secondary/10 rounded-lg">
          <Calculator className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Carbon Footprint Calculator</h3>
          <p className="text-sm text-muted-foreground">See how your daily choices impact our planet</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Transport */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <span className="font-medium">Transportation (days per week)</span>
          </div>
          <Slider
            value={transport}
            onValueChange={setTransport}
            max={7}
            min={0}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            How many days do you use cars/buses per week? Current: {transport[0]} days
          </p>
        </div>

        {/* Energy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <span className="font-medium">Home Energy Use</span>
          </div>
          <Slider
            value={energy}
            onValueChange={setEnergy}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            How much electricity do you use? (1=very little, 10=a lot) Current: {energy[0]}
          </p>
        </div>

        {/* Food */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            <span className="font-medium">Food Choices</span>
          </div>
          <Slider
            value={food}
            onValueChange={setFood}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            How often do you eat meat? (1=never, 10=every meal) Current: {food[0]}
          </p>
        </div>

        {/* Results */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Your Carbon Score:</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-primary">{totalFootprint.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className={`font-semibold ${footprintInfo.color}`}>{footprintInfo.level}</p>
            <p className="text-sm text-muted-foreground mt-1">{footprintInfo.message}</p>
          </div>
          
          <Button variant="nature" className="w-full mt-4" size="sm" onClick={getTips}>
            Get Tips to Improve
          </Button>
        </div>

        {/* Tips Section */}
        {showTips && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold">Improvement Tips</h4>
              <Button variant="ghost" size="icon" onClick={() => setShowTips(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ul className="space-y-2">
              {tips.map((tip) => (
                <li key={tip.id} className="text-sm text-muted-foreground">{tip.tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CarbonCalculator;