import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';  // Directly specify your backend URL here

  constructor(private http: HttpClient) {}

  // Login method to send credentials to the backend
  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
