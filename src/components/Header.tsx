import { Button } from '@/components/ui/button';
import { Gamepad2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer animate-float" 
            onClick={() => navigate('/')}
          >
            <div className="p-3 rounded-lg bg-gradient-primary shadow-glow">
              <Gamepad2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cncspt
              </h1>
              <p className="text-xs text-muted-foreground">Gaming Platform</p>
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground hover:bg-glass-primary"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};