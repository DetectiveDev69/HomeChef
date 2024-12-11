import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';  // Your backend signup URL

  constructor(private http: HttpClient) {}

  sendOrder(orders: { 
    UserId: string; 
    id: number; 
    imageURL: string; 
    ingredients: string; 
    name: string; 
    price: string; 
    quantity: number; 
  }[]): Observable<any> {
    return this.http.post(this.apiUrl, orders);
  }
}
