import { CompetitionsaveType } from './Competitionsave.type';
import { MatchType } from './Match.type';

export interface RoundType {
  id: number;
  name: string;

  competitionsave?: CompetitionsaveType;
  matches?: MatchType[];
}
