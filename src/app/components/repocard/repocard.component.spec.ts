import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepocardComponent } from './repocard.component';

describe('RepocardComponent', () => {
  let component: RepocardComponent;
  let fixture: ComponentFixture<RepocardComponent>;

  // Before running each test suite, configure the testing module
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepocardComponent],
    }).compileComponents(); // Compile component templates and styles asynchronously
  });

  // Before running each individual test case, create a component fixture
  beforeEach(() => {
    fixture = TestBed.createComponent(RepocardComponent);
    component = fixture.componentInstance; // Get an instance of the component
    fixture.detectChanges(); // Trigger change detection to update component bindings
  });

  // Test case to check if the component is successfully created
  it('should create', () => {
    expect(component).toBeTruthy(); // Assert that the component instance exists
  });
});
