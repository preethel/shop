// src/app/services/item-style.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemStyle } from '../pages/models/item-style';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.backend + '/itemstyle';

@Injectable({
  providedIn: 'root',
})
export class ItemStyleService {
  constructor(private http: HttpClient) {}

  addItemStyle(itemStyle: ItemStyle): Observable<string> {
    return this.http.post<string>(`${BASE_URL}`, itemStyle);
  }

  updateItemStyle(itemStyle: ItemStyle): Observable<void> {
    return this.http.put<void>(`${BASE_URL}`, itemStyle);
  }

  deleteItemStyle(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  getItemStyle(id: string): Observable<ItemStyle> {
    return this.http.get<ItemStyle>(`${BASE_URL}/${id}`);
  }

  getAllItemStyles(
    includePrices: boolean,
    itemCategory: string
  ): Observable<ItemStyle[]> {
    return this.http.get<ItemStyle[]>(
      `${BASE_URL}?itemCategory=${itemCategory}&includePrices=${includePrices}`
    );
  }
}
