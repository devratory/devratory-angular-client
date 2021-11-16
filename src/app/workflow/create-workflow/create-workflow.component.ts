import { Component, OnInit } from '@angular/core';
import { ProjectQuery } from '../../project/state';
import { Workflow, WorkflowService } from '../state';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss'],
})
export class CreateWorkflowComponent implements OnInit {
  constructor(private service: WorkflowService, private projectQuery: ProjectQuery) {}

  ngOnInit(): void {}

  onSave(workflow: Workflow) {
    this.service
      .add({
        ...workflow,
        projectId: this.projectQuery.getActiveId() as string,
        nodes: JSON.stringify(workflow.nodes),
      })
      .subscribe(console.log);
  }
}
