import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { ExportProjectButtonComponent } from './export-project-button/export-project-button.component';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';

@NgModule({
  declarations: [ProjectSelectorComponent, ExportProjectButtonComponent],
  imports: [SharedModule, MatMenuModule, MatDialogModule, MatListModule],
  exports: [ProjectSelectorComponent, ExportProjectButtonComponent],
})
export class ProjectSharedModule {}
