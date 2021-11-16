import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthQuery } from '@ekhmoi/angular-sdk';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MicroserviceService } from '../microservice/state/microservice.service';
import { ProjectService, ProjectStore } from './state';

@Injectable({
  providedIn: 'root',
})
export class ProjectRedirectGuard implements CanActivate {
  constructor(
    private router: Router,
    private authQuery: AuthQuery,
    private service: ProjectService,
    private store: ProjectStore,

    private microserviceService: MicroserviceService
  ) {}

  canActivate(snapShot: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.authQuery.getValue().isLoggedIn) {
      this.router.navigate(['/login']);
      return of(false);
    }
    const id = snapShot.paramMap.get('projectId');
    if (!id || id === 'default') {
      return this.service.getAll().pipe(
        map((projects) => {
          if (projects[0]) {
            this.router.navigate(['/project', projects[0].id]);
          }
          return false;
        })
      );
    } else {
      this.store.setActive(id as string);
      this.microserviceService.getByProjectId(id).subscribe();
      return of(true);
    }
  }
}
