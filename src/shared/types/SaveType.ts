import { ManagersaveType } from './ManagersaveType';

export interface SaveType {
  id: number;
  name: string;
  datetime: string;
  controllerManagersave?: ManagersaveType;
  createdAt: string;
  updatedAt: string;
}
