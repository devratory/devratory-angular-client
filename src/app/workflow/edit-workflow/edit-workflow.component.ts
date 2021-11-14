import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNilValue } from '@datorama/akita';
import { take } from 'rxjs/operators';
import { ProjectQuery } from 'src/app/project/state';
import { Workflow, WorkflowQuery, WorkflowService, WorkflowStore } from '../state';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrls: ['./edit-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWorkflowComponent implements OnInit {
  workflow$: any = this.query.active$.pipe(filterNilValue(), take(1));
  constructor(
    private service: WorkflowService,
    private query: WorkflowQuery,
    private store: WorkflowStore,
    private route: ActivatedRoute,
    private projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.store.setActive(this.route.snapshot.paramMap.get('id') as any);
    this.service
      .get(this.route.snapshot.paramMap.get('id'), {
        params: { projectId: this.projectQuery.getActiveId() },
        upsert: true,
      })
      .subscribe();
  }

  onSave(workflow: Workflow) {
    const id = workflow.id.split('@')[0] || workflow.id;
    this.service.update(id, { ...workflow, id, nodes: JSON.stringify(workflow.nodes) }).subscribe();
  }
}
