import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/signup';  // Your backend signup URL

  constructor(private http: HttpClient) {}

  // Update the method signature to accept userData as an object
  signup(userData: { username: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);  // Sending POST request to the backend
  }
}
