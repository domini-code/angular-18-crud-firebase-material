import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  action: string;
  created: Timestamp;
  updated: Timestamp;
}