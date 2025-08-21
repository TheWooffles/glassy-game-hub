import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GameCard } from '@/components/GameCard';
import { GameSearch } from '@/components/GameSearch';
import { gamesData } from '@/data/games';
import { Zap, Star, Trophy } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    gamesData.forEach(game => {
      game.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter games based on search and tag
  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = !selectedTag || game.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const featuredGames = gamesData.filter(game => game.featured);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-glow-pulse">
                Welcome to Cncspt
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Discover amazing HTML5 games crafted for endless entertainment. 
                Play instantly in your browser with no downloads required.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Instant Play</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent" />
                <span>Quality Games</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary-glow" />
                <span>Achievement System</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games Section */}
        {featuredGames.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Games</h2>
              <p className="text-muted-foreground">Hand-picked games for the best experience</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Search Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Browse All Games</h2>
            <p className="text-muted-foreground mb-8">Find your next favorite game</p>
            
            <GameSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              availableTags={availableTags}
            />
          </div>

          {/* Games Grid */}
          <div className="mt-8">
            {filteredGames.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <div
                    key={game.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="animate-fade-in"
                  >
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-card backdrop-blur-glass border-glass-border text-center p-12">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">No games found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse all categories.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('');
                    }}
                    variant="default"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="bg-gradient-card backdrop-blur-glass border-glass-border">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{gamesData.length}</div>
                <div className="text-muted-foreground">Games Available</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card backdrop-blur-glass border-glass-border">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-accent mb-2">{availableTags.length}</div>
                <div className="text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card backdrop-blur-glass border-glass-border">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary-glow mb-2">100%</div>
                <div className="text-muted-foreground">Free to Play</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
