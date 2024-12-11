import { Component } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  isPasswordVisible: boolean = false;

  constructor(private signupService: SignupService, private router: Router) {}  // Inject Router

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  getErrorMessage(input: any): string | null {
    if (!input || !input.errors) {
      return null;
    }

    if (input.errors['required']) {
      return '*';
    }

    if (input.name === 'username' && input.errors['pattern']) {
      return 'Username must contain only letters and numbers.';
    }

    if (input.name === 'email' && input.errors['pattern']) {
      return 'Email must contain "@" symbol.';
    }
    if (input.errors['minlength']) {
      return `Password must be at least ${input.errors['minlength'].requiredLength} characters long.`;
    }

    return null;
  }
  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };
      if (!this.username || !this.email || !this.password || !this.role) {
      console.log('Form has errors.');
    } else {
      this.signupService.signup(userData).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          // Redirect to the login page upon successful signup
          this.router.navigate(['/login']); 
        },
        (error) => {
          console.error('Signup failed:', error);
          // Handle error (e.g., show an error message)
        }
      );    }
  }

  
  
      

    


}
