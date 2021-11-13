import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectSharedModule } from '../project/project-shared.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent, PublicHeaderComponent } from './header';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, PublicHeaderComponent],
  imports: [SharedModule, MatToolbarModule, MatExpansionModule, MatSelectModule, MatMenuModule, ProjectSharedModule],
  exports: [HeaderComponent, SidenavComponent, PublicHeaderComponent],
})
export class LayoutModule {}
