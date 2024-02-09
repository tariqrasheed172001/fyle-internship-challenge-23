import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService; // Declare the ProfileService instance
  let httpTestingController: HttpTestingController; // Declare the HttpTestingController instance

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the necessary testing modules
      providers: [ProfileService], // Provide the ProfileService
    });
    service = TestBed.inject(ProfileService); // Initialize the ProfileService
    httpTestingController = TestBed.inject(HttpTestingController); // Initialize the HttpTestingController
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test whether the service is successfully created
  });

  it('should update username correctly', () => {
    const newUsername = 'newUser';
    service.updateUsername(newUsername);
    expect(service['username']).toEqual(newUsername); // Test whether the username is updated correctly
  });

  it('should fetch user data', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const mockUserData = { login: 'testUser', id: 12345 };

      service.getUser().subscribe((data) => {
        expect(data).toEqual(mockUserData); // Test whether the fetched user data matches the expected data
      });

      const req = httpMock.expectOne('https://api.github.com/users/xahoor72'); // Expect an HTTP request to the GitHub API
      expect(req.request.method).toEqual('GET'); // Expect the HTTP request method to be GET

      req.flush(mockUserData); // Provide mock data as the response
    }
  ));

  it('should fetch repositories data with pagination', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const pageNumber = 1;
      const perPage = 10;
      const mockRepositories = [{ name: 'repo1' }, { name: 'repo2' }];

      service.getRepositories(pageNumber, perPage).subscribe((data) => {
        expect(data).toEqual(mockRepositories); // Test whether the fetched repositories data matches the expected data
      });

      const req = httpMock.expectOne(
        `https://api.github.com/users/xahoor72/repos?per_page=${perPage}&page=${pageNumber}`
      ); // Expect an HTTP request with the correct URL
      expect(req.request.method).toEqual('GET'); // Expect the HTTP request method to be GET

      req.flush(mockRepositories); // Provide mock data as the response
    }
  ));
});
