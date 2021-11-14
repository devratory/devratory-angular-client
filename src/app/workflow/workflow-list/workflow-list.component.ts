import { Component, OnInit } from '@angular/core';
import { ProjectQuery } from 'src/app/project/state';
import { WorkflowQuery, WorkflowService } from '../state';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  workflows$ = this.query.selectAll();
  constructor(private service: WorkflowService, private query: WorkflowQuery, private projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.service.get({ params: { projectId: this.projectQuery.getActiveId() }, upsert: true }).subscribe();
  }
}
