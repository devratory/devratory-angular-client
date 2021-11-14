import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Project } from './project.model';
import { ProjectStore, ProjectState } from './project.store';

@Injectable({ providedIn: 'root' })
export class ProjectQuery extends QueryEntity<ProjectState> {
  active$: Observable<Project> = this.selectActive<Project>() as Observable<Project>;
  projects$ = this.selectAll();
  constructor(protected store: ProjectStore) {
    super(store);
  }
}
