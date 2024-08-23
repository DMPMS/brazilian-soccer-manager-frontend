import { UserType } from './User.type';

export interface AuthType {
  accessToken: string;
  user: UserType;
}
