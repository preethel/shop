import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../pages/models/appointment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.backend + '/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  addAppointment(appointment: Appointment): Observable<string> {
    return this.http.post<string>(`${BASE_URL}`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${BASE_URL}`, appointment);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}?id=${id}`);
  }

  getAppointment(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${BASE_URL}/${id}`);
  }

  getAppointments(name: string, minDate: Date, maxDate: Date) {
    return this.http
      .get<Appointment[]>(
        `${BASE_URL}?Name=${name}&MinDate=${minDate}&Maxdate=${maxDate}`
      )
      .pipe(map((response) => response.map(this.mapApiResponseToAppointment)));
  }

  private mapApiResponseToAppointment(apiResponse: any): Appointment {
    return {
      id: apiResponse.Id,
      date: new Date(apiResponse.Date),
      name: apiResponse.Name,
      mobileNo: apiResponse.MobileNo,
      telNo: apiResponse.TelNo,
      numberOfPeople: apiResponse.NumberOfPeople,
      weddingId: apiResponse.WeddingId,
      description: apiResponse.Description,
      reminderSent: apiResponse.ReminderSent,
      createdBy: apiResponse.CreatedBy,
      createdDate: new Date(apiResponse.CreatedDate),
      modifiedBy: apiResponse.ModifiedBy,
      modifiedDate: new Date(apiResponse.ModifiedDate),
    };
  }
}
