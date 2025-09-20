import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-nature flex flex-col items-center justify-center text-center">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="nature" size="xl">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;