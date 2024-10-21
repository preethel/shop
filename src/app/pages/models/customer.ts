import {BaseModel} from "./base-model";

export interface Customer extends BaseModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  telNumber: string;
  email: string;
  address: string;
}
