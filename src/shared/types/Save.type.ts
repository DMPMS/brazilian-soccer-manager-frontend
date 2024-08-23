import { ManagersaveType } from './Managersave.type';

export interface SaveType {
  id: number;
  name: string;
  datetime: string;
  createdAt: string;
  updatedAt: string;

  controllerManagersave?: ManagersaveType;
}
