import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap the AppModule to start the Angular application
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err)); // Catch any errors during bootstrapping and log them to the console
