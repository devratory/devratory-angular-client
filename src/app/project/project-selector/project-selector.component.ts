import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectQuery, ProjectService } from '../state';

@Component({
  selector: 'app-project-selector',
  template: `
    <ng-container *ngIf="{ projects: projects$ | async, active: activeProject$ | async } as data">
      <button class="project-selector-button" color="accent" mat-stroked-button [matMenuTriggerFor]="projectsMenu">
        <span *ngIf="data.active; else selectProject">
          <b>{{ data.active.name }}</b> ({{ data.active.environmentTag }})
        </span>
        <ng-template #selectProject>Select project</ng-template>
        <mat-icon>arrow_drop_down</mat-icon>
      </button>
      <mat-menu #projectsMenu="matMenu" xPosition="after" class="project-selector-list">
        <mat-selection-list #shoes [multiple]="false" (selectionChange)="switchToProject($event.option.value)">
          <mat-list-option
            *ngFor="let project of data.projects"
            [value]="project.id"
            [ngClass]="{ selected: data.active?.id === project.id }"
          >
            <div class="project-select-option">
              {{ project.name }}
              <div>
                <button mat-icon-button aria-label="Example icon button with a home icon" matTooltip="Make default">
                  <mat-icon>grade</mat-icon>
                </button>
                <button
                  mat-icon-button
                  aria-label="Example icon button with a home icon"
                  matTooltip="Edit project settings"
                >
                  <mat-icon>settings</mat-icon>
                </button>
                <button mat-icon-button aria-label="Example icon button with a home icon" matTooltip="Remove project">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </mat-list-option>
        </mat-selection-list>
        <button mat-raised-button (click)="createNewProject()" color="primary" class="create-button">
          Create new
          <mat-icon>add</mat-icon>
        </button>
      </mat-menu>
    </ng-container>
  `,
  styles: [
    `
      button.project-selector-button {
        border: 2px solid #9c9fae !important;
        color: #9c9fae;
      }
      .project-select-option {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .project-select-option .mat-icon-button {
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
      .project-select-option mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      mat-list-option:not(:hover) .project-select-option button {
        display: none;
      }
    `,
  ],
})
export class ProjectSelectorComponent {
  projects$ = this.query.projects$;
  activeProject$ = this.query.active$;

  constructor(
    private service: ProjectService,
    private dialogService: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private query: ProjectQuery
  ) {}

  ngOnInit() {
    this.service.getAll();
  }

  switchToProject(projectId: string) {
    const projectUrl = '/project';
    const paths = location.href.split(projectUrl)[1].split('/');
    this.router.navigate([projectUrl, projectId, ...paths.slice(2, paths.length)]);
  }

  createNewProject() {
    this.dialogService.open(CreateProjectComponent, {
      panelClass: 'create-project-dialog',
    });
  }
}
