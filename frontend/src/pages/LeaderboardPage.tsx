import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/services/api';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {leaderboard.map((user, index) => (
                <li key={user.id} className="flex items-center justify-between p-4 rounded-md bg-gray-50">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-500">{index + 1}</span>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-lg">{user.points}</span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LeaderboardPage;
