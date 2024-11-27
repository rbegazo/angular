import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router, autiService: AuthService) { }

  async onLogout() {
    localStorage.removeItem('token'); //Elimina el token del almacenamiento local
    this.router.navigate(['/login']); //Redirige a la página de inicio de sesión
  }
}
