import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Importar tus rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Proporciona HttpClient globalmente
    provideRouter(routes)  // Configura el enrutador con tus rutas
  ]
});
