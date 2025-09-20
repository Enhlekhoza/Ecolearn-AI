import { useState, useEffect } from "react";
import { Lightbulb, ArrowRight, Leaf, Droplets, Sun, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import climateActions from "@/assets/climate-actions.png";
import api from "@/services/api";
import { toast } from "sonner";

const ClimateFactsCard = () => {
  const [tips, setTips] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await api.get('/tips');
        setTips(response.data);
      } catch (error) {
        console.error('Failed to fetch tips', error);
      }
    };

    fetchTips();
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const completeTip = async (tipId: number) => {
    try {
      await api.post(`/tips/${tipId}/complete`);
      toast.success("You earned 10 points!");
    } catch (error) {
      console.error('Failed to complete tip', error);
      toast.error('Failed to complete tip');
    }
  };

  if (tips.length === 0) {
    return null;
  }

  const tip = tips[currentTip];
  const IconComponent = tip.category === 'Water' ? Droplets : tip.category === 'Energy' ? Sun : Leaf;

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
          <IconComponent className={`w-6 h-6 text-primary flex-shrink-0 mt-1`} />
          <div>
            <h4 className="font-semibold text-foreground mb-2">{tip.category}</h4>
            <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
              <p className="text-sm font-medium text-primary">💡 Your Action:</p>
              <p className="text-xs text-foreground mt-1">{tip.tip}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button
            onClick={() => completeTip(tip.id)}
            variant="outline"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Done
          </Button>
          <Button
            onClick={nextTip}
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