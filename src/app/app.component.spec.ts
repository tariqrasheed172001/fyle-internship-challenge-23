import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileService } from './core/services/profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ReposComponent } from './components/repos/repos.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>; // Fixture to hold the component
  let appComponent: AppComponent; // Reference to the AppComponent instance

  beforeEach(() => {
    // Configure the testing module with necessary components, services, and modules
    TestBed.configureTestingModule({
      declarations: [AppComponent, ProfileComponent, ReposComponent], // Declare components needed by the AppComponent
      imports: [FormsModule, HttpClientModule], // Import necessary modules
      providers: [ProfileService, HttpClient], // Provide necessary services
    });

    // Create a component fixture for the AppComponent
    fixture = TestBed.createComponent(AppComponent);

    // Get the reference to the AppComponent instance
    appComponent = fixture.componentInstance;
  });

  // Test case: Ensure the AppComponent is created successfully
  it('should create the app', () => {
    // Create a fixture for AppComponent
    const fixture = TestBed.createComponent(AppComponent);

    // Get the AppComponent instance
    const app = fixture.componentInstance;

    // Trigger the ngOnInit lifecycle hook
    appComponent.ngOnInit();

    // Expect the AppComponent to be truthy, indicating it's successfully created
    expect(app).toBeTruthy();
  });

  // Test case: Ensure the app-profile component is rendered
  it('should render the app-profile component', () => {
    // Access the compiled template of the fixture
    const compiled = fixture.nativeElement;

    // Expect to find the app-profile component in the compiled template
    expect(compiled.querySelector('app-profile')).toBeTruthy();
  });
});
