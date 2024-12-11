import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { TokenService } from './services/token.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent  implements OnInit, OnDestroy {tokenSubscription: Subscription | null = null;
  token: string | null = null;
  payload: any = null;
  role:any;



  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.monitorToken();

  }

  ngOnInit(): void {
    
  }


 
  logout(): void {
    localStorage.removeItem('authToken');
    this.token = null;
    console.log('Logged out successfully.');
  }

  onHover(): void {
    const container = this.scrollContainer.nativeElement;
    const scrollWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;

    // Scroll by 10% of the remaining scrollable width
    const scrollPosition = (scrollWidth - containerWidth) * 0.1;
    container.scrollLeft = container.scrollLeft + scrollPosition;
  }
  navigate(route: any): void{
    this.router.navigate(route)
  }
  public monitorToken(): void {
    this.ngZone.runOutsideAngular(() => {
      this.tokenSubscription = interval(1000).subscribe(() => {
        const newToken = localStorage.getItem('authToken'); // Get token from localStorage

        // Check if the token has changed
        if (this.token !== newToken) {
          this.ngZone.run(() => {
            this.token = newToken; // Update the token
            this.handleTokenChange();
          });
        }
      });
    });
  }

  private handleTokenChange(): void {
    // If the token is invalid or expired, handle accordingly
    if (!this.token || !this.tokenService.checkTokenExpiration(this.token)) {
      alert('Your session has expired. You will be redirected to the login page.');
      this.router.navigate(['/login']);
      console.log('Token is invalid or expired');
      this.role = null; // Reset role
      this.tokenService.tokenChanged.emit(true); 
    } else {
      // Decode the token if it exists and is valid
      const payload = this.decodeJWT(this.token);
      console.log('Decoded Payload:', payload);
      this.role = payload?.role || null;
    }
  }

  // Helper method to decode a JWT
  private decodeJWT(token: string): any | null {
    try {
      const payloadBase64 = token.split('.')[1]; // Extract payload part
      const decodedPayload = atob(payloadBase64); // Decode Base64
      return JSON.parse(decodedPayload); // Parse JSON
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }



 

  
}
