export interface Game {
  id: string;
  title: string;
  description: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  folder: string;
  featured?: boolean;
}

export interface GameCollection {
  games: Game[];
}