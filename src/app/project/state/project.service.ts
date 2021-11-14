import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectQuery } from '.';
import { Project } from './project.model';
import { ProjectStore, ProjectState } from './project.store';

@Injectable({ providedIn: 'root' })
export class ProjectService extends NgEntityService<ProjectState> {
  constructor(protected store: ProjectStore, private query: ProjectQuery) {
    super(store);
    this.get<Project[]>();
  }

  create(project: Project) {
    return this.getHttp()
      .post<Project>(`${environment.gatewayUrl}/projects`, project)
      .pipe(tap((createdProject) => this.store.add(createdProject)));
  }

  getAll(force = false) {
    if (this.query.getCount() && !force) {
      return of(this.query.getAll());
    }

    return this.getHttp()
      .get<Project[]>(`${environment.gatewayUrl}/projects`)
      .pipe(tap((projects) => this.store.upsertMany(projects)));
  }
}
