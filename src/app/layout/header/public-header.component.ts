import { Component } from '@angular/core';

@Component({
  selector: 'app-public-header',
  template: `
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
  `,
  styleUrls: ['header.component.scss'],
})
export class PublicHeaderComponent {}
