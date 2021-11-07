import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '@ekhmoi/angular-sdk';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="dark" fxLayout="row" *ngIf="auth.user$ | async as user; else publicHeader">
      <div class="start">
        <div class="logo">DL</div>
      </div>

      <div class="spacer"></div>

      <div class="body" fxLayout="row" fxFlex="100%" fxLayoutAlign="flex-start center">
        <app-project-selector></app-project-selector>
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

    <ng-template #publicHeader>
      <mat-toolbar color="dark" fxLayout="row">
        <div class="start">
          <!-- <img src="assets/devlab-logo.png" alt="" /> -->
          <div class="logo"></div>
        </div>

        <div class="body" fxFlex="100%"></div>
        <div class="end">
          <button mat-raised-button routerLink="/login" color="primary">Login</button>
        </div>
      </mat-toolbar>
    </ng-template>
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        flex-direction: row;
        position: sticky;
        position: -webkit-sticky; /* For macOS/iOS Safari */
        top: 0; /* Sets the sticky toolbar to be on top */
        z-index: 1000; /* Ensure that your app's content doesn't overlap the toolbar */
        height: var(--header-height);
        background: var(--color-dark);

        .start {
          display: inherit;
          justify-content: center;
          align-items: center;
          padding: 16px;
          img {
            width: 50%;
          }
        }
      }

      .logo {
        background: blueviolet;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        text-align: center;
      }

      .spacer {
        width: 1px;
        height: 30px;
        background: rgba(255, 255, 255, 0.25);
        margin: 0 45px 0 15px;
      }

      .user-logo {
        height: 40px;
        width: 40px;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
        img {
          height: 100%;
          width: 100%;
        }
      }

      .end button {
        color: #9c9fae;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthQuery) {}

  ngOnInit(): void {}
}
