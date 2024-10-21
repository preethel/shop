// src/app/services/item-price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemPrice } from '../pages/models/item-price';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.backend + '/itemprice';

@Injectable({
  providedIn: 'root',
})
export class ItemPriceService {
  constructor(private http: HttpClient) {}

  addItemPrice(itemPrice: ItemPrice): Observable<string> {
    return this.http.post<string>(`${BASE_URL}`, itemPrice);
  }

  updateItemPrice(itemPrice: ItemPrice): Observable<void> {
    return this.http.put<void>(`${BASE_URL}`, itemPrice);
  }

  deleteItemPrice(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  getItemPrice(id: string, includeItemStyle: boolean): Observable<ItemPrice> {
    return this.http.get<ItemPrice>(
      `${BASE_URL}/${id}?includeItemStyle=${includeItemStyle}`
    );
  }

  addItemPrices(itemPrices: ItemPrice[]): Observable<string[]> {
    return this.http.post<string[]>(`${BASE_URL}/bulk`, itemPrices);
  }

  updateItemPrices(itemPrices: ItemPrice[]): Observable<void> {
    return this.http.put<void>(`${BASE_URL}/bulk`, itemPrices);
  }
}
