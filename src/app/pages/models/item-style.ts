import { BaseModel } from './base-model';
import { ItemPrice } from './item-price';

export interface ItemStyle extends BaseModel {
  displayName: string;
  name: string;
  itemCategory: ItemCategory;
  sizeType: number;
  externalId?: string;
  imageUrl?: string;
  itemPrices: ItemPrice[];
}
export enum ItemCategory {
  Jackets,
  Pants,
  Shirts,
  Vests,
  Ties,
  BowTies,
  Shoes,
  Hats,
  Accessories,
}
