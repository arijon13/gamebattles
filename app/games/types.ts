import { Match } from './matches';
import { Tournament } from './tournaments';

export interface Criteria {
  regions: string[];
  teamSizes: string[];
  matchTypes: string[];
  showRegion: boolean;
}

export interface GameData {
  id: string;
  gameImage: string;
  matches: Match[];
  tournaments: Tournament[];
  criteria: Criteria;
} 