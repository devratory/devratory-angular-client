import { Component } from '@angular/core';
import { AuthQuery, AuthService } from '@ekhmoi/angular-sdk';

@Component({
  selector: 'app-public-header',
  template: `
    <mat-toolbar color="dark" fxLayout="row">
      <div class="start">
        <!-- <img src="assets/devlab-logo.png" alt="" /> -->
        <div class="logo">DL</div>
      </div>

      <div class="body" fxFlex="100%"></div>
      <div class="end">
        <button
          mat-raised-button
          routerLink="/project"
          color="primary"
          *ngIf="auth.isLoggedIn$ | async; else loginButton"
        >
          Go to Dashboard
        </button>

        <ng-template #loginButton>
          <button mat-raised-button routerLink="/login" color="primary">Login</button>
        </ng-template>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['header.component.scss'],
})
export class PublicHeaderComponent {
  constructor(public auth: AuthQuery) {}
}
