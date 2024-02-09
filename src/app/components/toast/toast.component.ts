import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast', // The selector used to identify this component in HTML templates
  templateUrl: './toast.component.html', // The HTML template file for this component
  styleUrls: ['./toast.component.scss'], // The CSS styles file(s) for this component
})
export class ToastComponent {
  @Input() errorMessage: string | null = null; // Input property to receive error messages from parent components
}
