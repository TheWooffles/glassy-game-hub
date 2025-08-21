import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Game } from '@/types/game';
import { useNavigate } from 'react-router-dom';
import { Play, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card backdrop-blur-glass border-glass-border hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-0 relative z-10">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSJoc2woMjI1IDMwJSA4JSAvIDAuOCkiLz4KPHN2ZyB4PSIxNzUiIHk9Ijg3LjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImhzbCgyMTAgNDAlIDk4JSkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiLz4KPGV4dGVjaGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz4KPHBhdGggZD0ibTIxIDEzLjUtMS02LjUtMy0xLTIgNi41Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
            }}
          />
          
          {game.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-accent text-accent-foreground shadow-accent-glow">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handlePlayGame}
              className="bg-primary text-primary-foreground p-4 rounded-full shadow-glow hover:scale-110 transition-transform duration-200"
            >
              <Play className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {game.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {game.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs border-glass-border bg-glass-secondary hover:bg-glass-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};