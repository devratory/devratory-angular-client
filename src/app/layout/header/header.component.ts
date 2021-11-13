import { Component } from '@angular/core';
import { AuthQuery } from '@ekhmoi/angular-sdk';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="dark" fxLayout="row" *ngIf="auth.user$ | async as user">
      <div class="start">
        <div class="logo">DL</div>
      </div>

      <div class="spacer"></div>

      <div class="body" fxLayout="row" fxFlex="100%" fxLayoutAlign="flex-start center">
        <app-project-selector></app-project-selector>
        <app-export-project-button></app-export-project-button>
      </div>
      <div class="end" fxLayout="row" fxLayoutAlign="center center">
        <button mat-icon-button>
          <mat-icon>search</mat-icon>
        </button>
        <button mat-button>
          Docs
          <mat-icon>menu_book</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>notifications</mat-icon>
        </button>
        <div class="user-logo" [matMenuTriggerFor]="userMenu">
          <img src="assets/avatar.svg" alt="" />
        </div>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item>
            {{ user.email }}
          </button>
          <button mat-menu-item disabled>
            <mat-icon>person</mat-icon>
            <span>Your profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Log out</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthQuery) {}
}
