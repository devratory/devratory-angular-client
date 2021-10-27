import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [SharedModule, MatToolbarModule],
})
export class NavigationModule {}
