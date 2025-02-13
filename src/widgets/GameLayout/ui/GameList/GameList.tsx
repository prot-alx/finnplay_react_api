import { useGamesStore } from "@/features/gamelist";

export function GameList() {
  const { games, isLoading, error } = useGamesStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
}
