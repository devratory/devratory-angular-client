import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  constructor(private route: ActivatedRoute, private service: ProjectService, private router: Router) {
    this.route.paramMap.pipe(map((params) => params.get('id'))).subscribe((id) => {
      if (!id) {
        this.service.getAll().subscribe((projects) => {
          if (projects[0]) {
            this.router.navigate(['/project', projects[0].id]);
          }
        });
      } else {
        this.service.setActive(id as string);
      }
    });
  }

  ngOnInit(): void {}
}
