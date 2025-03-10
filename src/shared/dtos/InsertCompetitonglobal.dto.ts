import { RuleEnum } from '../enums/Rule.enum';

export interface InsertCompetitionglobalDTO {
  name: string;
  season: string;
  srcImage: string;
  ruleId?: RuleEnum;
  teamglobalIds: number[];
}
