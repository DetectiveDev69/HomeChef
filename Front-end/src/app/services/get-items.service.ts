import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetItemsService {
  private apiUrl = 'http://localhost:3000/getitems'; 

  constructor(private http: HttpClient) {}

  // Method to fetch items from the backend
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
