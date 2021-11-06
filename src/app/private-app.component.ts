import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-root',
  template: `
    <app-header></app-header>
    <mat-drawer-container>
      <mat-drawer mode="side" opened>
        <app-sidenav></app-sidenav>
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
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
export class PrivateAppComponent implements OnInit {
  constructor() {
    console.log('Private app Component loaded');
  }

  ngOnInit(): void {}
}
