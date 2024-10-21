import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../pages/models/customer';
import { PagedResponse } from '../pages/models/paged-response';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.backend + '/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  addCustomer(customer: Customer) {
    return this.http.post<string>(`${BASE_URL}`, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(`${BASE_URL}`, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${BASE_URL}?id=${id}`);
  }

  getPagedCustomers(
    filter: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<{
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      items: Customer[];
      pageNumber: number;
      pageSize: number;
      totalItems: number;
    }>(`${BASE_URL}/paged?Filter=${filter}&page=${page}&size=${size}`);
  }

  private mapApiResponseToCustomer(apiResponse: any): Customer {
    return {
      id: apiResponse.Id,
      firstName: apiResponse.FirstName,
      lastName: apiResponse.LastName,
      phoneNumber: apiResponse.PhoneNumber,
      telNumber: apiResponse.TelNumber,
      email: apiResponse.Email,
      address: apiResponse.Address,
      createdBy: apiResponse.CreatedBy,
      createdDate: apiResponse.CreatedDate,
      modifiedBy: apiResponse.ModifiedBy,
      modifiedDate: apiResponse.Modified,
    };
  }
}
