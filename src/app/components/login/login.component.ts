import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string = '';  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {  // Inject Router
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          if (response.status) {
            this.message = 'Login successful';
            this.router.navigate(['/dashboard']);
          } else {
            this.message = response.message;
            this.showTemporaryMessage();  // Show and hide the message
          }
        },
        error => {
          this.message = 'Error de conexión. Inténtalo nuevamente.';
          this.showTemporaryMessage();  // Show and hide the message
        }
      );
    }
  }
  
  showTemporaryMessage() {
    setTimeout(() => {
      const messageBox = document.querySelector('.message-box') as HTMLElement;
      if (messageBox) {
        messageBox.style.animation = 'fadeOut 1.5s forwards';  
        setTimeout(() => {
          this.message = '';  
        }, 1500);  
      }
    }, 3000);  
  }
  
  
  
}
