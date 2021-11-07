import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';

@NgModule({
  declarations: [ProjectSelectorComponent],
  imports: [SharedModule, MatMenuModule, MatDialogModule],
  exports: [ProjectSelectorComponent],
})
export class ProjectSharedModule {}
