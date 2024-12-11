import { Component, ViewChild, ElementRef, OnInit, OnDestroy, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { ScrollAnimationService } from '../scroll-animation.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  tokenSubscription: Subscription | null = null;
  token: string | null = null;
  payload: any = null;
  newToken: any = null;
  userRole: string | null = null; // To store the role
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  @ViewChildren('animateOnScrollh3') animatedElements1!: QueryList<ElementRef>;




  constructor(
    private tokenService: TokenService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2,   
     private scrollAnimationService: ScrollAnimationService
  ) {}
  ngAfterViewInit() {
    console.log(this.animatedElements)
    this.scrollAnimationService.observeElements(this.animatedElements,this.renderer,'animateOnScroll',1 );
    this.scrollAnimationService.observeElements(this.animatedElements1,this.renderer,'animateOnScrollh3',1 );

}


  ngOnInit(): void {
    this.handleToken()
    
  }


  ngOnDestroy(): void {
    this.tokenSubscription?.unsubscribe();
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
 




 public handleToken(): void {
    this.newToken = this.decodeJWT(localStorage.getItem('authToken')); 

    if (this.newToken) {
      this.userRole = this.newToken.role; // Store the role for use in the template
      console.log('User Role:', this.userRole);
    } else {
      console.log('Token is null or invalid. Cannot extract role.');
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
}
