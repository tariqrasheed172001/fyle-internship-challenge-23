import { Component, OnInit } from '@angular/core';
import { ProfileService } from './core/services/profile.service';

@Component({
  selector: 'app-root', // Selector used to identify this component in HTML templates
  templateUrl: './app.component.html', // HTML template file for this component
  styleUrls: ['./app.component.scss'], // CSS styles file(s) for this component
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge'; // Title of the application

  constructor(private profileService: ProfileService) {} // Injecting the ProfileService

  ngOnInit() {
    // Lifecycle hook called after the component has been initialized
    // This is a good place to perform initialization logic, like fetching data
  }
}
