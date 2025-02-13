import { Game, Group, Provider } from "@/entities";

export interface GameData {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}
