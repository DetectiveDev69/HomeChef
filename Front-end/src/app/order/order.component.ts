import { Component } from '@angular/core';
import { IncomingordersService } from '../incomingorders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  incomingOrder: any[] = [];
  newToken: any = null;
  UserID: string = '';  // Initially null, will be set after decoding the token

  constructor(private orderService: IncomingordersService) {}

  ngOnInit(): void {
    // Fetch the token and set UserID first
    this.handleToken();
    
    // Only call getOrders if UserID is set
    if (this.UserID) {
      this.getOrders();
    } else {
      console.error('UserID is not available.');
    }
  }

  public handleToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
      this.newToken = this.decodeJWT(token);
      if (this.newToken) {
        this.UserID = this.newToken.userId.toString(); // Store the UserId as a string
        console.log('User Id:', this.UserID);
      } else {
        console.log('Token is null or invalid. Cannot extract UserId.');
      }
    } else {
      console.log('localStorage is not available');
    }
  }

  private decodeJWT(token: string | null): any {
    if (!token) {
      console.error('No token provided');
      return null;
    }
    try {
      const payloadBase64 = token.split('.')[1]; // Extract payload part
      if (!payloadBase64) {
        console.error('Invalid token structure');
        return null;
      }
      const decodedPayload = atob(payloadBase64); // Decode Base64
      return JSON.parse(decodedPayload); // Parse JSON
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  public getOrders(): void {
    // Ensure the UserID is defined before calling the service
    if (this.UserID) {
      this.orderService.getOrdersByUserId().subscribe(
        (orders) => {
          this.incomingOrder = orders.filter(order => order.UserId == this.UserID);
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.log('UserID is not available');
    }
  }
}
