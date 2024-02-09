import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-repos', // Component selector
  templateUrl: './repos.component.html', // Template URL for the component's HTML
  styleUrls: ['./repos.component.scss'], // Styles URL for the component's CSS
})
export class ReposComponent implements OnInit {
  @Input() profile: any; // Input property for profile data
  @Input() repos: any; // Input property for repositories data

  // Component properties
  username: string;
  pageNumber = 1;
  perPage = 10;
  numberOfPages = 1;
  currentPage: number = 1;
  isProfile: boolean = true;
  maxVisiblePages: number = this.calculateMaxVisiblePages(); // Calculate maximum visible pages
  errorMessage: string | null = null;
  private errorMessageTimeout: any; // Hold the timeout reference

  constructor(private profileService: ProfileService) {
    this.username = ''; // Initialize username
  }

  // Method to generate array of pages with ellipsis for pagination
  getPagesWithEllipsis(): (number | null)[] {
    // Extract necessary variables for pagination
    const totalPageCount = this.numberOfPages; // Total number of pages
    const currentPage = this.currentPage; // Current active page
    const visiblePages: (number | null)[] = []; // Array to store visible pages and ellipsis
    const maxVisiblePages = this.maxVisiblePages; // Maximum number of visible pages
    const startPage = Math.max(1, currentPage - 2); // Start page index considering current page and visible pages
    const endPage = Math.min(totalPageCount, startPage + maxVisiblePages - 1); // End page index based on start page and max visible pages

    // Add ellipsis and first page if necessary
    if (startPage > 1) {
      visiblePages.push(1); // Add first page
      if (startPage > 2) {
        visiblePages.push(null); // Add ellipsis indicator
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i); // Add page number
    }

    // Add ellipsis and last page if necessary
    if (endPage < totalPageCount) {
      if (endPage < totalPageCount - 1) {
        visiblePages.push(null); // Add ellipsis indicator
      }
      visiblePages.push(totalPageCount); // Add last page
    }

    return visiblePages; // Return array of visible pages with ellipsis
  }

  // Listen for window resize event to adjust maxVisiblePages
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Recalculate maximum visible pages based on window size
    this.maxVisiblePages = this.calculateMaxVisiblePages();
  }

  // Calculate the maximum number of visible pages based on screen size
  calculateMaxVisiblePages(): number {
    // Define the maximum number of visible pages for different screen sizes
    const smallScreenMaxPages = 3; // Maximum pages for small screens
    const mediumScreenMaxPages = 7; // Maximum pages for medium screens
    const largeScreenMaxPages = 10; // Maximum pages for large screens

    // Determine the current screen size based on window.innerWidth
    if (window.innerWidth < 600) {
      return smallScreenMaxPages; // Return maximum pages for small screens
    } else if (window.innerWidth < 1024) {
      return mediumScreenMaxPages; // Return maximum pages for medium screens
    } else {
      return largeScreenMaxPages; // Return maximum pages for large screens
    }
  }

  // Go to the next page
  onNext() {
    // Implementation to navigate to the next page
    if (this.pageNumber < this.numberOfPages) {
      // Increment the page number if not at the last page
      this.pageNumber++;
    } else {
      // If at the last page, loop to the first page
      this.pageNumber = 1;
    }
    // Update the current page
    this.currentPage = this.pageNumber;
    // Trigger repository search based on the new page
    this.searchRepos();
  }

  // Go to the previous page
  onPrevious() {
    // Implementation to navigate to the previous page
    if (this.pageNumber > 1) {
      // Decrement the page number if not at the first page
      this.pageNumber--;
    } else {
      // If at the first page, loop to the last page
      this.pageNumber = this.numberOfPages;
    }
    // Update the current page
    this.currentPage = this.pageNumber;
    // Trigger repository search based on the new page
    this.searchRepos();
  }

  // Go to a specific page
  goToPage(page: number) {
    // Implementation to navigate to a specific page
    this.pageNumber = page; // Set the page number to the specified page
    this.currentPage = page; // Update the current page
    this.searchRepos(); // Trigger repository search based on the new page
  }

  // Check if a page is the current page
  isCurrentPage(page: number): boolean {
    // Implementation to check if a page is the current page

    // Calculate the total number of pages
    this.numberOfPages = Math.floor(
      this.profile.public_repos / this.perPage + 1
    );

    // Return true if the specified page is equal to the current page
    return page === this.currentPage;
  }

  // Get array of page numbers
  getPages(): number[] {
    // Implementation to generate array of page numbers

    // Generate an array of page numbers from 1 to numberOfPages
    return Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
  }

  // Search repositories based on pagination
  searchRepos() {
    // Implementation to search repositories

    // Clear the existing repository data and error message
    this.repos = null;
    this.errorMessage = null;

    // Call the profile service to fetch repositories with pagination
    this.profileService
      .getRepositories(this.pageNumber, this.perPage)
      .subscribe({
        // On successful retrieval of repositories
        next: (repos) => {
          this.repos = repos; // Set the retrieved repositories
          this.errorMessage = null; // Clear any existing error message
        },
        // On error while fetching repositories
        error: (error) => {
          // Set error message for user repositories fetch failure
          this.errorMessage =
            'Failed to fetch user repositories. Please try again later.';
        },
      });
  }

  // Handle change in items per page
  onPerPageChange() {
    // Implementation to handle change in items per page

    // Reset the current page to 1 when items per page changes
    this.currentPage = 1;

    // Trigger repository search with the new page number
    this.searchRepos();

    // Navigate to the first page after changing items per page
    this.goToPage(1);
  }

  ngOnInit(): void {}
}
