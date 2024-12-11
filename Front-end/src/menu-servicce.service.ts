import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServicceService {
  menus = [
    {id: 1, name: 'Pizza', price: 9.99, image: 'assets/images/pizza.jpg',quantity: 0 },
    { id: 2,name: 'Burger', price: 5.99, image: 'assets/images/burger.jpg',quantity: 0 }, 
  ];

  // Get all menus
  getMenus() {
    return this.menus;
  }

  // Add a new menu
  addMenu(menu: any) {
    this.menus.push(menu);
  }
}
