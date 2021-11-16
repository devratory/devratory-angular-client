import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  template: ` <mat-drawer-container>
    <mat-drawer mode="side" opened>
      <app-sidenav></app-sidenav>
    </mat-drawer>
    <mat-drawer-content>
      <router-outlet></router-outlet>
    </mat-drawer-content>
  </mat-drawer-container>`,
  styles: [
    `
      mat-drawer-container {
        width: 100%;
        height: calc(100% - var(--header-height));
        background: var(--background-color);
      }
      mat-drawer {
        background: var(--sidebar-color);
      }
      mat-drawer-content {
        overflow-x: hidden;
      }
    `,
  ],
})
export class ProjectContainer {}
