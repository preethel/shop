// src/app/models/item-price.ts
import { BaseModel } from './base-model';
import { ItemStyle } from './item-style';

export interface ItemPrice extends BaseModel {
  itemStyleId: string;
  itemStyle?: ItemStyle;
  year: string;
  price: number;
  boyPrice: number;
  babyPrice: number;
  startDate: Date;
  endDate: Date;
}
