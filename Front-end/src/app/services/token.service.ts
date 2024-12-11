import { EventEmitter, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenChanged: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router)  {}

  // Check if the token is expired
  checkTokenExpiration(token: string | null): boolean {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const expDate = decoded.exp * 1000;  // Convert to milliseconds
        const currentTime = Date.now();

        if (currentTime > expDate) {
          localStorage.removeItem('authToken');
          this.tokenChanged.emit(true); // Emit event to notify token expiration
          return false; // Token expired
        } else {
          console.log('Token is still valid');
          return true; // Token still valid
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
        return false; // Error decoding token, treat as expired
      }
    }
    console.log('No token found');
    return false; // No token found, treat as expired
  }

  // Log time remaining until token expires

}
