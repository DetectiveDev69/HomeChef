import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/item';  // Your backend signup URL

  constructor(private http: HttpClient) {}

  // Update the method signature to accept userData as an object
  item(userData: { name: string; price: number; imageURL: string; ingredients: string , UserId:string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);  // Sending POST request to the backend
  }
  

}

