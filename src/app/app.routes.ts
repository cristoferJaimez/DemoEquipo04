import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Import the DashboardComponent
//import { RegisterComponent } from './components/register/register.component'; // Import the DashboardComponent

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige la ruta vacía a 'login'
  { path: 'login', component: LoginComponent },          // Ruta para el componente de login
  { path: 'dashboard', component: DashboardComponent },  // Ruta para el componente de dashboard
  //{ path: 'register', component: RegisterComponent },  // Ruta para el componente de register
];
