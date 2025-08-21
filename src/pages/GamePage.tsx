import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { gamesData } from '@/data/games';
import { useState } from 'react';

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = gamesData.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-gradient-card backdrop-blur-glass border-glass-border p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Game Not Found</h2>
          <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </Card>
      </div>
    );
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background-glass backdrop-blur-glass border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-foreground hover:bg-glass-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              className="bg-background-glass border-glass-border hover:bg-glass-primary"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 mr-2" />
              ) : (
                <Maximize className="w-4 h-4 mr-2" />
              )}
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </div>
        </div>
      </header>

      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'container mx-auto px-4 py-8'}`}>
        {!isFullscreen && (
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Game Info */}
            <Card className="bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-foreground">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{game.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Instructions:</h4>
                  <p className="text-sm text-muted-foreground">{game.instructions}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className="border-glass-border bg-glass-secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Game Container */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card backdrop-blur-glass border-glass-border animate-fade-in">
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={`/games/${game.folder}/index.html`}
                      className="w-full h-full border-0"
                      title={game.title}
                      allowFullScreen
                      onError={() => {
                        console.error(`Failed to load game: ${game.folder}`);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {isFullscreen && (
          <iframe
            src={`/games/${game.folder}/index.html`}
            className="w-full h-full border-0"
            title={game.title}
            allowFullScreen
            onError={() => {
              console.error(`Failed to load game: ${game.folder}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GamePage;