
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';      // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  termsAccepted: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router service
  ) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
message='';
  // Handle form submission
onSubmit() {
  const loginData = {
    email: this.username,
    password: this.password
  };

  this.authService.login(loginData).subscribe(
    (response) => {
      console.log('Login successful', response);

      // Store the token in localStorage
      const token = response.token;
      localStorage.setItem('authToken', token);
      this.router.navigate(['/']);  // Adjust '/home' to your default route


      // Redirect to the default page
    },
    (error) => {
      console.log('Login error', error);
      this.message=error.error.message  ;
      // Handle error (e.g., invalid credentials)
    }
  );
}




}
