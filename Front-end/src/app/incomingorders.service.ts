import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomingordersService {

  private apiUrl = 'http://localhost:3000/getorders';  // Your backend URL

  constructor(private http: HttpClient) { }

  // Method to get orders by userId
  getOrdersByUserId(): Observable<any[]> {
    // Create query parameters using HttpParams

    // Send GET request with the userId as query parameter
    return this.http.get<any[]>(this.apiUrl);
  }
}
