import {BaseModel} from "./base-model";

export interface Appointment extends BaseModel {
  date: Date;
  name: string;
  mobileNo: string;
  telNo: string;
  numberOfPeople: number;
  weddingId?: string;
  description: string;
  reminderSent: boolean;
}
