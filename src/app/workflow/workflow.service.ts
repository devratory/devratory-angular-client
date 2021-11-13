import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IWorkflow } from './workflow.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private _itemMap: { [id: string]: IWorkflow } = {};
  private _items$ = new BehaviorSubject<IWorkflow[]>([]);
  items$ = this._items$.asObservable();
  private _activeItemId$ = new BehaviorSubject<string | null>(null);
  active$: Observable<IWorkflow> = combineLatest([this._items$, this._activeItemId$]).pipe(
    map(([workflows, activeId]) => workflows.find((workflow) => workflow.id === activeId)),
    filter((workflow) => !!workflow)
  ) as any;

  constructor(private http: HttpClient) {}

  create(projectId: string | null, workflow: Partial<IWorkflow>) {
    if (!projectId) {
      throw new Error('Specify which project to assign new workflow');
    }
    return this.http.post<IWorkflow>(`${environment.gatewayUrl}/projects/${projectId}/workflows`, workflow).pipe(
      tap((createdWorkflow) => {
        this._itemMap[createdWorkflow.id] = createdWorkflow;
        this.triggerChanges();
      })
    );
  }

  getByProjctId(projectId: string | null, force = false) {
    if (!projectId) {
      throw new Error('Specify which project to assign new workflow');
    }

    if (!force && this._items$.getValue().length) {
      return this._items$.pipe(take(1));
    }
    return this.http.get<IWorkflow[]>(`${environment.gatewayUrl}/projects/${projectId}/workflows`).pipe(
      tap((workflows) => {
        this._itemMap = workflows.reduce((mappedItems, workflow) => ({ ...mappedItems, [workflow.id]: workflow }), {});
        this.triggerChanges();
      })
    );
  }

  setActive(id?: string) {
    this._activeItemId$.next(id || null);
  }

  update(projectId: string, workflow: IWorkflow) {
    return this.http
      .put<IWorkflow>(`${environment.gatewayUrl}/projects/${projectId}/workflows/${workflow.id}`, workflow)
      .pipe(
        tap((updatedWorkflow) => {
          this._itemMap[workflow.id] = updatedWorkflow as any;
          this.triggerChanges();
        })
      );
  }

  triggerChanges = () => {
    this._items$.next(Object.values(this._itemMap));
  };
}
