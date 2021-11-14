import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Workflow } from '.';
import { WorkflowState, WorkflowStore } from './workflow.store';

@Injectable({ providedIn: 'root' })
export class WorkflowQuery extends QueryEntity<WorkflowState> {
  active$: Observable<Workflow> = this.selectActive<Workflow>() as Observable<Workflow>;

  constructor(protected store: WorkflowStore) {
    super(store);
  }
}
