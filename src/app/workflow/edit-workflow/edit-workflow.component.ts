import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ProjectService } from 'src/app/project/project.service';
import { IWorkflow } from '../workflow.interface';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrls: ['./edit-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWorkflowComponent implements OnInit {
  workflow$: any = this.service.active$.pipe(
    filter((wf) => !!wf),
    take(1)
  );
  constructor(
    private service: WorkflowService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.service.getByProjctId(this.projectService.getActiveId()).subscribe();
    this.service.setActive(this.route.snapshot.paramMap.get('id') as any);
  }

  onSave(workflow: IWorkflow) {
    this.service
      .update(this.projectService.getActiveId() as string, {
        ...workflow,
        id: workflow.id.split('@')[0] || workflow.id,
        nodes: JSON.stringify(workflow.nodes),
      })
      .subscribe(console.log);
  }
}
