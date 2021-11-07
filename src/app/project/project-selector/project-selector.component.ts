import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-selector',
  template: `
    <ng-container *ngIf="{ projects: projects$ | async, active: activeProject$ | async } as data">
      <div fxLayout="row" class="project-selector" fxLayoutAlign="center center">
        <button color="accent" mat-stroked-button [matMenuTriggerFor]="projectsMenu">
          <span *ngIf="data.active; else selectProject">
            <b>{{ data.active.name }}</b> ({{ data.active.environmentTag }})
          </span>
          <ng-template #selectProject>Select project</ng-template>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
      </div>
      <mat-menu #projectsMenu="matMenu" xPosition="after" [overlapTrigger]="true" class="project-selector-list">
        <button
          mat-menu-item
          class="project-item"
          *ngFor="let project of data.projects"
          [ngClass]="{ selected: data.active?.id === project.id }"
          (click)="switchToProject(project)"
        >
          {{ project.name }}
        </button>
        <button mat-stroked-button (click)="createNewProject()" color="primary">
          Create new
          <mat-icon>add</mat-icon>
        </button>
      </mat-menu>
    </ng-container>
  `,
  styles: [
    `
      .project-selector {
        .label {
          font-size: 15px;
          margin-right: 15px;
          color: rgba(255, 255, 255, 0.7);
        }
        button {
          border: 2px solid;
        }
      }
    `,
  ],
})
export class ProjectSelectorComponent {
  projects$ = this.service.getAll();
  activeProject$ = this.service.active$;

  constructor(private service: ProjectService, private dialogService: MatDialog, private router: Router) {}

  switchToProject(project: any) {
    this.router.navigate(['/project', project.id]);
  }

  createNewProject() {
    this.dialogService.open(CreateProjectComponent, {
      panelClass: 'create-project-dialog',
    });
  }
}
