import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _items$ = new BehaviorSubject<Project[]>([]);
  items$ = this._items$.asObservable();
  private _activeItemId$ = new BehaviorSubject<string | null>(null);
  active$ = combineLatest([this._items$, this._activeItemId$]).pipe(
    map(([projects, activeId]) => projects.find((project) => project.id === activeId))
  );

  constructor(private http: HttpClient) {}

  create(project: Project) {
    return this.http.post<Project>(`${environment.gatewayUrl}/projects`, project).pipe(tap(createdProject => this._items$.next([createdProject,...this._items$.getValue()])))
  }

  getAll(force = false) {
    if (this._items$.getValue().length && !force) {
      return this._items$.pipe(take(1));
    }

    return this.http
      .get<Project[]>(`${environment.gatewayUrl}/projects`)
      .pipe(tap((projects) => this._items$.next(projects)));
  }

  setActive(id?: string) {
    this._activeItemId$.next(id || null);
  }
}
