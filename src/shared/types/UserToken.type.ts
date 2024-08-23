import { UserUserTypeEnum } from '../enums/UserUserType.enum';

export interface UserTokenType {
  id: number;
  userType: UserUserTypeEnum;
}
