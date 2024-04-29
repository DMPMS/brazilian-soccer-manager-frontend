import { CountryType } from './CountryType';
import { ManagerglobalType } from './ManagerglobalType';

export interface TeamsglobalType {
  id: number;
  name: string;
  srcImage: string;
  country?: CountryType;
  managerglobal?: ManagerglobalType;
}
