import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Properties to store profile data, username, repositories, pagination information, and error messages
  profile: any;
  username: string;
  repos: any;
  pageNumber = 1;
  perPage = 10;
  numberOfPages = 1;
  isProfile: boolean = true;
  errorMessage: string | null = null;

  // Constructor injecting ProfileService
  constructor(private profileService: ProfileService) {
    this.username = ''; // Initialize username to empty string
  }

  // Method to search for user profile
  searchProfile() {
    if (this.username) {
      // Reset profile, flags, and error message
      this.profile = null;
      this.isProfile = null;
      this.profileService.updateUsername(this.username); // Update username in profile service
      this.errorMessage = null;

      // Get user profile data
      this.profileService.getUser().subscribe({
        next: (data) => {
          // Handle successful response
          this.profile = data; // Store profile data
          this.isProfile = true; // Set profile found flag to true
          // Calculate number of pages based on repositories for pagination
          this.numberOfPages = Math.ceil(
            this.profile.public_repos / this.perPage
          );
          this.errorMessage = null; // Clear error message
          // Get user repositories
          this.searchRepos();
        },
        error: (error) => {
          // Handle errors
          if (error.status === 404) {
            // Handle case where user is not found
            this.isProfile = false;
          } else {
            // Handle other errors
            this.isProfile = false;
            this.errorMessage = 'Failed to fetch user. Please try again later.';
          }
        },
      });
    }
  }

  // Method to search for user repositories
  searchRepos() {
    // Reset repositories
    this.repos = null;
    // Fetch user repositories
    this.profileService
      .getRepositories(this.pageNumber, this.perPage)
      .subscribe({
        next: (repos) => {
          // Handle successful response
          this.repos = repos; // Store repositories data
          this.errorMessage = null; // Clear error message
        },
        error: (error) => {
          // Handle errors
          // Handle errors when fetching repositories
          this.errorMessage =
            'Failed to fetch user repositories. Please try again later.';
        },
      });
  }

  // Lifecycle hook
  ngOnInit() {}
}
