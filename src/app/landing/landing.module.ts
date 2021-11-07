import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, MatToolbarModule],
  exports: [LandingComponent],
})
export class LandingModule {}
