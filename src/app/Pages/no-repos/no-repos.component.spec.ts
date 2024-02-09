// Import necessary modules for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component to be tested
import { NoReposComponent } from './no-repos.component';

// Test suite for the NoReposComponent
describe('NoReposComponent', () => {
  let component: NoReposComponent; // Reference to the component instance
  let fixture: ComponentFixture<NoReposComponent>; // Reference to the component fixture

  // Before each test, set up the testing environment
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoReposComponent], // Declare the component being tested
    });

    // Create a fixture for the component and retrieve the component instance
    fixture = TestBed.createComponent(NoReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  // Test case: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component instance to be truthy
  });
});
