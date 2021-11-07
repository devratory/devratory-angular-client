import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  template: ` <mat-drawer-container>
    <mat-drawer mode="side" opened>
      <app-sidenav></app-sidenav>
    </mat-drawer>
    <mat-drawer-content>
      <router-outlet></router-outlet>
    </mat-drawer-content>
  </mat-drawer-container>`,
  styles: [
    `
      mat-drawer-container {
        width: 100%;
        height: calc(100% - var(--header-height));
        background: var(--background-color);
      }
      mat-drawer {
        background: var(--sidebar-color);
      }
      mat-drawer-content {
        overflow-x: hidden;
      }
    `,
  ],
})
export class ProjectContainer implements OnInit {
  constructor(private route: ActivatedRoute, private service: ProjectService) {
    this.route.paramMap
      .pipe(filter((params) => params.has('id')))
      .subscribe((paramMap) => this.service.setActive(paramMap.get('id') as string));
  }

  ngOnInit(): void {}
}
