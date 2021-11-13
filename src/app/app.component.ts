import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

const PUBLIC_URLS = ['/', '/login'];
@Component({
  selector: 'app-root',
  template: `
    <app-public-header *ngIf="isPublicRoute$ | async; else header"></app-public-header>
    <ng-template #header>
      <app-header></app-header>
    </ng-template>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  isPublicRoute$ = new BehaviorSubject(true);

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this._subscribeToRouterEvents();
  }

  private _subscribeToRouterEvents() {
    this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((ev) => {
      this.isPublicRoute$.next(this._isPublicUrl((ev as NavigationStart).url));
    });
  }

  private _isPublicUrl(url: string) {
    return PUBLIC_URLS.includes(url);
  }
}
