// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Item } from '../pages/models/item';
import { PagedResponse } from '../pages/models/paged-response';
import { environment } from '../../../environments/environment';
import { ItemStyle } from '../pages/models/item-style';
import { ItemPrice } from '../pages/models/item-price';

const BASE_URL = environment.backend + '/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  addItem(item: Item) {
    return this.http.post<string>(`${BASE_URL}`, item);
  }

  updateItem(item: Item) {
    return this.http.put(`${BASE_URL}`, item);
  }

  deleteItem(id: string) {
    return this.http.delete(`${BASE_URL}?id=${id}`);
  }

  getPagedItems(
    filter: string = '',
    page: number = 1,
    size: number = 5
  ): Observable<any> {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Item[]>(BASE_URL, { params });
  }
}
