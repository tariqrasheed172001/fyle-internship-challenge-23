import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './core/services/profile.service';
import { FormsModule } from '@angular/forms';
import { RepocardComponent } from './components/repocard/repocard.component';
import { ReposComponent } from './components/repos/repos.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { NoReposComponent } from './Pages/no-repos/no-repos.component';
import { ToastComponent } from './components/toast/toast.component';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';

@NgModule({
  declarations: [
    // Declaration of all the components used in the application
    AppComponent, // The root component
    ProfileComponent, // Component to display user profile
    RepocardComponent, // Component to display repository card
    ReposComponent, // Component to display list of repositories
    NotFoundComponent, // Component for not found page
    NoReposComponent, // Component for no repositories found page
    ToastComponent, // Component for displaying toast messages
  ],
  imports: [
    BrowserModule, // BrowserModule required for running Angular in a browser environment
    HttpClientModule, // Module for making HTTP requests
    FormsModule, // Module for two-way data binding using ngModel directive
  ],
  providers: [
    // Providers array to register services and other providers
    // HTTP_INTERCEPTORS: Used for intercepting HTTP requests and responses
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }, // CacheInterceptor for caching HTTP requests
    ProfileService, // Service for fetching user profile data
  ],
  bootstrap: [AppComponent], // The root component to bootstrap when the application starts
})
export class AppModule {} // The root module of the application
