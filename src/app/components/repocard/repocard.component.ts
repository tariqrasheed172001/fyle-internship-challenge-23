import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repocard', // Component selector used in HTML
  templateUrl: './repocard.component.html', // Template URL for the component's HTML
  styleUrls: ['./repocard.component.scss'], // Styles URL for the component's CSS
})
export class RepocardComponent {
  @Input() repo: any; // Input decorator to indicate that 'repo' is an input property

  // 'repo' property is an input property which will be passed to this component from its parent component
}
