// Import necessary modules and components for testing
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ProfileService } from 'src/app/core/services/profile.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReposComponent } from '../repos/repos.component';
import { fakeAsync, tick } from '@angular/core/testing';

// Begin test suite for ProfileComponent
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;

  // Set up test environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule], // Import necessary modules
      declarations: [ProfileComponent, ReposComponent], // Declare components being used in the tests
      providers: [ProfileService], // Provide necessary services
    }).compileComponents(); // Compile components
  });

  // Initialize necessary variables before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent); // Create component fixture
    component = fixture.componentInstance; // Get the component instance
    profileService = TestBed.inject(ProfileService); // Inject the profile service
    fixture.detectChanges(); // Detect changes in the component
  });

  // Test to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if profile search works successfully
  it('should search profile successfully', () => {
    spyOn(profileService, 'updateUsername'); // Spy on updateUsername method
    spyOn(profileService, 'getUser').and.returnValue(
      of({
        name: 'John Doe',
        bio: 'Software Developer',
        location: 'New York',
        html_url: 'https://github.com/johndoe',
      })
    ); // Spy on getUser method and return a mock user
    spyOn(component, 'searchRepos'); // Spy on searchRepos method

    component.username = 'johndoe'; // Set username
    component.searchProfile(); // Trigger search profile method

    expect(profileService.updateUsername).toHaveBeenCalledWith('johndoe'); // Expect updateUsername to have been called with 'johndoe'
    expect(component.profile).toEqual({
      name: 'John Doe',
      bio: 'Software Developer',
      location: 'New York',
      html_url: 'https://github.com/johndoe',
    }); // Expect profile data to match mock data
    expect(component.isProfile).toBeTruthy(); // Expect isProfile to be true
    expect(component.errorMessage).toBeNull(); // Expect no error message to be set
    expect(component.searchRepos).toHaveBeenCalled(); // Expect searchRepos method to have been called
  });

  // Test to handle user not found error
  it('should handle user not found error', () => {
    spyOn(profileService, 'getUser').and.returnValue(
      throwError({ status: 404 })
    ); // Spy on getUser method and return a 404 error
    component.username = 'nonexistentuser'; // Set a username
    component.searchProfile(); // Trigger search profile method

    expect(component.isProfile).toBeFalsy(); // Expect isProfile to be false
    expect(component.errorMessage).toBeNull(); // Expect no error message to be set for 404 status
  });

  // Test to handle other errors
  it('should handle other errors', fakeAsync(() => {
    spyOn(profileService, 'getUser').and.returnValue(
      throwError({ status: 500 })
    ); // Spy on getUser method and return a 500 error
    component.username = 'erroruser'; // Set a username
    component.searchProfile(); // Trigger search profile method

    expect(component.isProfile).toBeFalsy(); // Expect isProfile to be false
    expect(component.errorMessage).toEqual(
      'Failed to fetch user. Please try again later.'
    ); // Expect error message to match the expected message
  }));

  // Test to search repositories successfully
  it('should search repositories successfully', () => {
    spyOn(profileService, 'getRepositories').and.returnValue(
      of(['repo1', 'repo2'])
    ); // Spy on getRepositories method and return mock repositories
    component.searchRepos(); // Trigger search repositories method

    expect(component.repos).toEqual(['repo1', 'repo2']); // Expect repositories to match the mock data
    expect(component.errorMessage).toBeNull(); // Expect no error message to be set
  });

  // Test to handle repository fetch error
  it('should handle repository fetch error', () => {
    spyOn(profileService, 'getRepositories').and.returnValue(
      throwError('Error fetching repositories')
    ); // Spy on getRepositories method and return an error
    component.searchRepos(); // Trigger search repositories method

    expect(component.repos).toBeNull(); // Expect repositories to be null
    expect(component.errorMessage).toEqual(
      'Failed to fetch user repositories. Please try again later.'
    ); // Expect error message to match the expected message
  });
});
