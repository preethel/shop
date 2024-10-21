// src/app/models/item.ts
import { BaseModel } from './base-model';
import { ItemStyle } from './item-style';

export interface Item extends BaseModel {
  // name: string;
  // description: string;
  itemStyleId: string;
  size: string;
  barcode: any;
  itemStyle?: ItemStyle;
  isDamaged: boolean;
  createdDate: Date;
  modifiedDate: Date;
}
