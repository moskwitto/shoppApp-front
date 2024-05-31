// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 
import { LoginRequest } from '../models/auth.model';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  model: LoginRequest = { email: '', password: '' };
  loginMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient,private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.model).subscribe(
      data => {
        console.log('Login successful', data);
        alert('Login successful');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        alert('Incorrect password or email');
      }
    );
  }

  ToRegister(): void {
    this.router.navigate(['/register']);
  }
}
