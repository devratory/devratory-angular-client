import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project/project.service';
import { IWorkflow } from '../workflow.interface';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss'],
})
export class CreateWorkflowComponent implements OnInit {
  constructor(private service: WorkflowService, private projectService: ProjectService) {}

  ngOnInit(): void {}

  onSave(workflow: IWorkflow) {
    this.service
      .create(this.projectService.getActiveId(), {
        ...workflow,
        nodes: JSON.stringify(workflow.nodes),
      })
      .subscribe(console.log);
  }
}
