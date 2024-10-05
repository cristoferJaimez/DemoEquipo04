import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { HealthStatusComponent } from './components/health-status/health-status.component';
import { IncidentReportComponent } from './components/incident-report/incident-report.component';
import { MedicalReportComponent } from './components/medical-report/medical-report.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskAssignmentComponent } from './components/task-assignment/task-assignment.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { GestionAnimalesComponent } from './components/gestion-animales/gestion-animales.component';
import { LoginComponent } from './components/login/login.component';
//errors
import { E404Component } from './components/404/404.component';
import { E500Component } from './components/500/500.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'animal-list', component: AnimalListComponent },
  { path: 'animal-details/:id', component: AnimalDetailsComponent }, // Ruta con parámetro para ver detalles del animal
  { path: 'health-status', component: HealthStatusComponent },
  { path: 'incident-report', component: IncidentReportComponent },
  { path: 'medical-report', component: MedicalReportComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task-assignment', component: TaskAssignmentComponent },
  { path: 'user-details/:id', component: UserDetailsComponent }, // Ruta con parámetro para ver detalles de usuarios
  { path: 'user-management', component: UserManagementComponent },
  { path: 'gestion-animales', component: GestionAnimalesComponent },
  { path: '400', component: E404Component },
  { path: '500', component: E500Component },
  { path: '**', redirectTo: '400' } // Ruta comodín para redirigir al dashboard si no se encuentra la ruta
];
