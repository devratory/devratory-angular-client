import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';
import { LandingModule } from './landing/landing.module';
import { PrivateAppComponent } from './private-app.component';

@NgModule({
  declarations: [AppComponent, PrivateAppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSidenavModule, LayoutModule, LandingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
