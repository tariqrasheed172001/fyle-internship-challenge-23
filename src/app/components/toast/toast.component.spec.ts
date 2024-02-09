import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(() => {
    // Configure the testing module
    TestBed.configureTestingModule({
      declarations: [ToastComponent], // Declare the component under test
    });

    // Create a component fixture
    fixture = TestBed.createComponent(ToastComponent);

    // Retrieve the component instance
    component = fixture.componentInstance;

    // Trigger change detection to initialize the component
    fixture.detectChanges();
  });

  // Test case: Ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component to be truthy, indicating it's successfully created
  });
});
