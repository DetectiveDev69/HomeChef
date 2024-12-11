import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NgZone } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{
  name: string = '';
  price: number = 0;
  imageURL: string = '';
  ingredients: string = ''; // Default empty string or use a default value
  tokenSubscription: Subscription | null = null;
  token: string | null = null;
  newToken: any = null;
  UserId: string = '';  // Ensure UserId is initialized



  constructor(
    private itemservice: ItemService, 
    private router: Router,
    private ngZone: NgZone, 
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.handleToken();
  }

  newMenu = {
    name: '',
    price: 0,
    imageURL: '',
    ingredients: '',
    UserId: this.UserId // Initially setting UserId to the value from class property
  };
  

  public handleToken(): void {
    this.newToken = this.decodeJWT(localStorage.getItem('authToken')); 
    if (this.newToken) {
      this.UserId = this.newToken.userId; // Store the UserId
      console.log('User Id:', this.UserId);
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

  ingredientInput: string = ''; 
  ingredientsArray: string[] = ["Onion", "Tomato"];

  // Add ingredient to the ingredients string
  addIngredient(): void {
    if (this.ingredientInput.trim()) {
      if (this.newMenu.ingredients) {
        this.newMenu.ingredients += ', ' + this.ingredientInput.trim();
      } else {
        this.newMenu.ingredients = this.ingredientInput.trim();
      }
      this.ingredientsArray.push(this.ingredientInput.trim());
      console.log('Ingredients String:', this.newMenu.ingredients);
      console.log('Ingredients Array:', this.ingredientsArray);
      this.ingredientInput = '';
    }
  }

  // Method to toggle an ingredient in the array (check/uncheck logic)
  toggleIngredient(ingredient: string): void {
    const index = this.ingredientsArray.indexOf(ingredient);

    if (index !== -1) {
      this.ingredientsArray.splice(index, 1);
    } else {
      this.ingredientsArray.push(ingredient);
    }

    console.log('Updated Ingredients Array:', this.ingredientsArray);
  }

  addMenu(): void {
    this.newMenu.ingredients = this.ingredientsArray.join(', '); // Ensure it’s updated
    console.log(this.newMenu);

    // Add UserId to the newMenu object before submission
    this.newMenu.UserId = this.UserId;  // Make sure UserId is updated before sending

    this.itemservice.item(this.newMenu).subscribe(
      (response) => {
        console.log('Item added successfully:', response);
        // Redirect or show a success message as needed
      },
      (error) => {
        console.error('Adding item failed:', error);
      }
    );

    this.ingredientInput = '';

    // Reset the form fields for a new entry
    this.newMenu = {
      name: '',
      price: 0,
      imageURL: '',
      ingredients: '',
      UserId: ' ' // Ensure UserId is carried over when resetting
    };
  }

  reset(): void {
    // Reset logic for form
    this.ingredientInput = '';
    this.newMenu = {
      name: '',
      price: 0,
      imageURL: '',
      ingredients: '',
      UserId: '' // Ensure UserId is still available after reset
    };
  }
}
