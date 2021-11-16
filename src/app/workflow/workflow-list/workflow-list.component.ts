import { Component, OnInit } from '@angular/core';
import { combineQueries } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { ProjectQuery } from 'src/app/project/state';
import { WorkflowQuery, WorkflowService } from '../state';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  workflows$ = combineQueries([this.query.selectAll(), this.projectQuery.selectActiveId()]).pipe(
    map(([workflows, projectId]) => workflows.filter((wf) => wf.projectId === projectId))
  );
  constructor(private service: WorkflowService, private query: WorkflowQuery, private projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.service.get({ params: { projectId: this.projectQuery.getActiveId() }, upsert: true }).subscribe();
  }
}
