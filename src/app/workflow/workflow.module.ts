import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { SharedModule } from '../shared/shared.module';
import { WorkflowEditorModule } from './workflow-editor/workflow-editor.module';
import { EditWorkflowComponent } from './edit-workflow/edit-workflow.component';

@NgModule({
  declarations: [WorkflowListComponent, CreateWorkflowComponent, EditWorkflowComponent],
  imports: [WorkflowRoutingModule, SharedModule, WorkflowEditorModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowModule {}
