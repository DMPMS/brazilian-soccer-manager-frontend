import { CountryType } from './CountryType';
import { ManagerglobalType } from './ManagerglobalType';

export interface TeamglobalType {
  id: number;
  name: string;
  srcImage: string;
  country?: CountryType;
  managerglobal?: ManagerglobalType;
}
