import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LandingComponent, HeaderComponent],
  imports: [SharedModule, MatToolbarModule],
  exports: [LandingComponent],
})
export class LandingModule {}
