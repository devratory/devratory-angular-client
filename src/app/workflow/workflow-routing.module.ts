import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { EditWorkflowComponent } from './edit-workflow/edit-workflow.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';

const routes: Routes = [
  { path: '', component: WorkflowListComponent },
  { path: 'create', component: CreateWorkflowComponent },
  { path: ':id/edit', component: EditWorkflowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
