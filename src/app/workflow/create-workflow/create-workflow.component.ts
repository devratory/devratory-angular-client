import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MicroserviceService } from 'src/app/microservice/state/microservice.service';
import { ProjectQuery } from '../../project/state';
import { Workflow, WorkflowService } from '../state';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.scss'],
})
export class CreateWorkflowComponent implements OnInit {
  ready$ = this.microserviceService
    .get({ params: { projectId: this.projectQuery.getActiveId() } })
    .pipe(map(() => true));
  constructor(
    private service: WorkflowService,
    private projectQuery: ProjectQuery,
    private microserviceService: MicroserviceService
  ) {}

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
