import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/auth';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature flex flex-col items-center justify-center">
      <Header />
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access EcoLearn AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="your@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                type="password" 
                id="password" 
                placeholder="********" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" variant="nature">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary hover:underline">Sign Up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
