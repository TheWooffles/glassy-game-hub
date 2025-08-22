import { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types/game';

interface GameLoaderProps {
  game: Game;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const GameLoader = ({ game, isFullscreen, onToggleFullscreen }: GameLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isUnityGame = game.tags.includes('Unity') || game.folder.includes('unity');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadProgress(100);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const enterFullscreen = async () => {
    if (containerRef.current) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    }
    onToggleFullscreen();
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
    onToggleFullscreen();
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-gradient-card backdrop-blur-glass border-glass-border rounded-lg">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">Failed to Load Game</h3>
          <p className="text-muted-foreground">The game could not be loaded. Please try again later.</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="bg-background-glass border-glass-border hover:bg-glass-primary"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video rounded-lg overflow-hidden'}`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-card backdrop-blur-glass border-glass-border rounded-lg flex flex-col items-center justify-center z-10">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {isUnityGame ? 'Loading Unity Game...' : 'Loading Game...'}
              </h3>
              <div className="w-64 h-2 bg-background-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(loadProgress, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round(Math.min(loadProgress, 100))}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Controls */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={exitFullscreen}
            variant="outline"
            size="sm"
            className="bg-background-glass/80 backdrop-blur-glass border-glass-border hover:bg-glass-primary"
          >
            <Minimize className="w-4 h-4 mr-2" />
            Exit Fullscreen
          </Button>
        </div>
      )}

      {/* Game iframe */}
      <iframe
        ref={iframeRef}
        src={`/games/${game.folder}/index.html`}
        className={`border-0 ${isFullscreen ? 'w-full h-full' : 'w-full h-full'}`}
        title={game.title}
        allowFullScreen
        allow="gamepad; microphone; camera"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          background: isUnityGame ? '#000' : 'transparent',
        }}
      />

      {/* Fullscreen Button (when not in fullscreen) */}
      {!isFullscreen && !isLoading && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={enterFullscreen}
            variant="outline"
            size="sm"
            className="bg-background-glass/80 backdrop-blur-glass border-glass-border hover:bg-glass-primary"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};