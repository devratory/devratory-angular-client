import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { WorkflowQuery } from '.';
import { WorkflowState, WorkflowStore } from './workflow.store';

@Injectable({ providedIn: 'root' })
export class WorkflowService extends NgEntityService<WorkflowState> {
  // baseUrl = 'workflows';
  constructor(protected store: WorkflowStore, private query: WorkflowQuery) {
    super(store, { resourceName: 'workflows' });
  }

  // getByProjctId(projectId: string | null, force = false) {
  //   if (!projectId) {
  //     throw new Error('Specify which project to assign new workflow');
  //   }

  //   if (!force && this.query.getCount()) {
  //     return of(this.query.getAll());
  //   }
  //   return this.getHttp()
  //     .get<Workflow[]>(`${environment.gatewayUrl}/projects/${projectId}/workflows`)
  //     .pipe(tap((workflows) => this.store.upsertMany(workflows)));
  // }
}
