
import { GetItemsService } from '../services/get-items.service';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TokenService } from '../services/token.service';
import { NgZone } from '@angular/core';
import { OrderService } from '../order.service';
export interface Menu {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  implements OnInit , OnDestroy{

  constructor(private menuService: GetItemsService,  private tokenService : TokenService, private orderService: OrderService,    
    private ngZone: NgZone,) { } 

    menus: any[] = []; 
    showAddMenuForm = false;
    filteredMenus:any[] = [];
    menuItems: any[] = [];
    loading: boolean = true;
    error: string = '';
    searchTerm = '';
     
    tokenSubscription: Subscription | null = null;
    token: string | null = null;
    payload: any = null;
    role:any;
  
    ngOnInit(): void {
      console.log(this.order);
      this.handleToken();
      this.menuService.getItems().subscribe(
        (data) => {
          console.log(data)
          this.menus = data;  // Store the fetched menu items
          this.loading = false;    // Update loading state
        },
        (err) => {
          this.error = 'Failed to fetch menu items';
          this.loading = false;
        }
      );
    }
    submitOrder(): void {
      this.orderService.sendOrder(this.Allmenu).subscribe(
        response => {
          console.log('Order submitted successfully:', response);
        },
        error => {
          console.error('Error submitting order:', error);
        }
      );
    }
    ngOnDestroy(): void {
      this.tokenSubscription?.unsubscribe();
    }
 
    newToken: any = null;
    clientID: string = '';  // Ensure UserId is initialized
    public handleToken(): void {
      this.newToken = this.decodeJWT(localStorage.getItem('authToken')); 
      if (this.newToken) {
        this.clientID = this.newToken.userId; // Store the UserId
        console.log('User Id:', this.clientID);
      } else {
        console.log('Token is null or invalid. Cannot extract UserId.');
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

  showRightSidebar: boolean = false; 
  toggleRightSidebar() {
    this.showRightSidebar = !this.showRightSidebar;
  }
  calculateTotal(): number {
    return this.Allmenu.reduce((acc, menu) => acc + menu.price * menu.quantity, 0);
  }
  total : number =0;
  aftertax(total:number) : number{
    return (total*1.2);
  }
  filterMenus() {
    this.filteredMenus = this.menus.filter(menu =>
      menu.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  closeAddMenuForm() {
    this.showAddMenuForm = false;
  }
  adjustQuantity(menuId: number, change: number) {
    const menu = this.menus.find(item => item.id === menuId);
    if (menu) {
      menu.quantity = Math.max(0, menu.quantity + change); 
    }
  }
  get Allmenu() {
    console.log();
    return this.menus
      .filter(menu => menu.quantity > 0)
      .map(menu => {
        return { ...menu, clientID: this.clientID };  // Add clientId to each menu
      });
  }
  order= this.Allmenu;
  
}
