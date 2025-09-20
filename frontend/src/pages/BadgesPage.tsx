import { useState, useEffect } from 'react';
import { Shield, Star, Award } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/services/api'; // Assuming you have a configured api client

const BadgesPage = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // Replace with the actual user ID
        const userId = 1;
        const response = await api.get(`/badges/user/${userId}`);
        setBadges(response.data);
      } catch (error) {
        console.error('Failed to fetch badges', error);
      }
    };

    fetchBadges();
  }, []);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-12 h-12 text-blue-500" />;
      case 'star':
        return <Star className="w-12 h-12 text-yellow-500" />;
      case 'award':
        return <Award className="w-12 h-12 text-green-500" />;
      default:
        return <Award className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Badges</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {badges.map((userBadge) => (
            <Card key={userBadge.badge.id}>
              <CardHeader className="flex flex-col items-center text-center">
                {getBadgeIcon(userBadge.badge.icon)}
                <CardTitle className="mt-4">{userBadge.badge.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{userBadge.badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
