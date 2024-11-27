import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
 
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const token = await this.authService.login(email, password);
        localStorage.setItem('token', token || '');
        console.log('Inicio de sesión exitoso. Token:', token);
        this.router.navigate(['/home']);
        // Redirige o realiza acciones adicionales después del inicio de sesión
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
}
