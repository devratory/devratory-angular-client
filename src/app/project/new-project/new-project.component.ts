import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  template: `
    <div class="content" fxLayout="column" fxLayoutAlign="center center">
      <app-create-project></app-create-project>
    </div>
  `,
})
export class NewProjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
