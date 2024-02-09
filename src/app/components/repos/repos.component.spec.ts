import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReposComponent } from './repos.component';
import { ProfileService } from 'src/app/core/services/profile.service';
import { of, throwError } from 'rxjs';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    // Create a spy object for ProfileService
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', [
      'getRepositories',
    ]);

    // Configure the testing module
    await TestBed.configureTestingModule({
      declarations: [ReposComponent],
      providers: [{ provide: ProfileService, useValue: profileServiceSpy }],
    }).compileComponents();

    // Initialize the spy object
    profileService = TestBed.inject(
      ProfileService
    ) as jasmine.SpyObj<ProfileService>;
  });

  beforeEach(() => {
    // Create a component fixture
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Ensure component creation
  });

  // Test for generating pages with ellipsis correctly
  it('should generate pages with ellipsis correctly', () => {
    // Set up component properties
    component.numberOfPages = 10;
    component.currentPage = 5;
    component.maxVisiblePages = 5;

    // Call the method being tested
    const pages = component.getPagesWithEllipsis();

    // Expectations
    expect(pages).toEqual([1, null, 3, 4, 5, 6, 7, null, 10]);

    // Modify currentPage for another test case
    component.currentPage = 1;

    // Call the method being tested with different currentPage
    const pages2 = component.getPagesWithEllipsis();

    // Expectations for the second test case
    expect(pages2).toEqual([1, 2, 3, 4, 5, null, 10]);
  });

  // Test for navigating to the next page correctly
  it('should navigate to next page correctly', () => {
    // Mock the behavior of getRepositories method to return an observable
    profileService.getRepositories.and.returnValue(of(['repo1', 'repo2']));

    // Set initial conditions
    component.pageNumber = 1;
    component.numberOfPages = 3;

    // Trigger the method being tested
    component.onNext();

    // Expectations
    expect(component.pageNumber).toEqual(2);

    // Reset the pageNumber for another test case
    component.pageNumber = 3;

    // Trigger the method being tested again
    component.onNext();

    // Expectations for the second test case
    expect(component.pageNumber).toEqual(1);
  });

  // Test for navigating to the previous page correctly
  it('should navigate to previous page correctly', () => {
    // Mock the behavior of getRepositories method to return an observable
    profileService.getRepositories.and.returnValue(of(['repo1', 'repo2']));

    // Set initial conditions
    component.pageNumber = 2;
    component.numberOfPages = 3;

    // Trigger the method being tested
    component.onPrevious();

    // Expectations
    expect(component.pageNumber).toEqual(1);

    // Reset the pageNumber for another test case
    component.pageNumber = 1;

    // Trigger the method being tested again
    component.onPrevious();

    // Expectations for the second test case
    expect(component.pageNumber).toEqual(3);
  });

  // Test for navigating to a particular page correctly
  it('should navigate to a particular page correctly', () => {
    // Mock the behavior of getRepositories method to return an observable
    profileService.getRepositories.and.returnValue(of(['repo1', 'repo2']));

    // Set initial conditions
    component.numberOfPages = 5;

    // Call the method being tested
    component.goToPage(3);

    // Expectations
    expect(component.pageNumber).toEqual(3);
    expect(component.currentPage).toEqual(3);
  });

  // Test for checking if it is the current page correctly
  it('should handle to check is it a current page or not correctly', () => {
    // Set up component properties
    component.profile = { public_repos: 20 }; // Mock profile with 20 public repositories
    component.numberOfPages = 5;
    component.currentPage = 3;

    // Call the method being tested
    const result1 = component.isCurrentPage(3);

    // Expectations
    expect(result1).toBeTrue();

    // Call the method being tested with a different page number
    const result2 = component.isCurrentPage(4);

    // Expectations for the second test case
    expect(result2).toBeFalse();
  });

  // Test for generating an array of page numbers
  it('should generate array of page numbers', () => {
    // Set up the component
    component.numberOfPages = 5; // Set the number of pages to 5

    // Call the method being tested
    const pages = component.getPages();

    // Expectations
    expect(pages.length).toBe(5); // Ensure the length of the array is equal to numberOfPages
    expect(pages).toEqual([1, 2, 3, 4, 5]); // Ensure the array contains the correct page numbers
  });

  // Test for handling change in items per page
  it('should handle change in items per page', () => {
    // Mock necessary methods and properties
    spyOn(component, 'searchRepos');
    spyOn(component, 'goToPage');

    // Set up initial conditions
    component.currentPage = 3; // Current page is 3
    component.perPage = 10; // Initial items per page
    component.numberOfPages = 20; // Total number of pages

    // Trigger the method being tested
    component.onPerPageChange();

    // Expectations
    expect(component.currentPage).toBe(1); // Current page should be reset to 1
    expect(component.searchRepos).toHaveBeenCalled(); // Ensure searchRepos method is called
    expect(component.goToPage).toHaveBeenCalledWith(1); // Ensure goToPage method is called with page 1
  });

  // Test for handling repository fetch error
  it('should handle repository fetch error', () => {
    // Mock the behavior of getRepositories method to throw an error
    profileService.getRepositories.and.returnValue(
      throwError('Error fetching repositories')
    );

    // Trigger the method being tested
    component.searchRepos();

    // Expectations
    expect(component.repos).toBeNull(); // Ensure repos is null
    expect(component.errorMessage).toEqual(
      'Failed to fetch user repositories. Please try again later.'
    ); // Ensure errorMessage is set correctly
  });

  // Test for returning 3 for small screens
  it('should return 3 for small screens', () => {
    // Simulate a small screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);

    // Expectation
    expect(component.calculateMaxVisiblePages()).toEqual(3);
  });

  // Test for returning 7 for medium screens
  it('should return 7 for medium screens', () => {
    // Simulate a medium screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);

    // Expectation
    expect(component.calculateMaxVisiblePages()).toEqual(7);
  });

  // Test for returning 10 for large screens
  it('should return 10 for large screens', () => {
    // Simulate a large screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);

    // Expectation
    expect(component.calculateMaxVisiblePages()).toEqual(10);
  });

  // Test for adjusting maxVisiblePages for small screens
  it('should adjust maxVisiblePages for small screens', () => {
    // Simulate a small screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);

    // Trigger the method being tested
    component.onResize(new Event('resize'));

    // Expectation
    expect(component.maxVisiblePages).toEqual(3); // Expect maxVisiblePages to be adjusted for small screens
  });

  // Test for adjusting maxVisiblePages for medium screens
  it('should adjust maxVisiblePages for medium screens', () => {
    // Simulate a medium screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);

    // Trigger the method being tested
    component.onResize(new Event('resize'));

    // Expectation
    expect(component.maxVisiblePages).toEqual(7); // Expect maxVisiblePages to be adjusted for medium screens
  });

  // Test for adjusting maxVisiblePages for large screens
  it('should adjust maxVisiblePages for large screens', () => {
    // Simulate a large screen size
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);

    // Trigger the method being tested
    component.onResize(new Event('resize'));

    // Expectation
    expect(component.maxVisiblePages).toEqual(10); // Expect maxVisiblePages to be adjusted for large screens
  });
});
