// Import necessary modules for testing from Angular core testing
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component to be tested
import { NotFoundComponent } from './not-found.component';

// Describe the test suite for the NotFoundComponent
describe('NotFoundComponent', () => {
  let component: NotFoundComponent; // Declare a variable to hold the component instance
  let fixture: ComponentFixture<NotFoundComponent>; // Declare a variable to hold the component fixture

  // Before each test, configure the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent], // Declare the component to be tested
    });
    // Create a component fixture for the NotFoundComponent
    fixture = TestBed.createComponent(NotFoundComponent);
    // Get the component instance from the fixture
    component = fixture.componentInstance;
    // Trigger change detection to update the component
    fixture.detectChanges();
  });

  // Test whether the component is created successfully
  it('should create', () => {
    // Expect the component instance to be truthy (not null or undefined)
    expect(component).toBeTruthy();
  });
});
