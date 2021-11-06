import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
  ],
  exports: [HeaderComponent, SidenavComponent],
})
export class LayoutModule {}
