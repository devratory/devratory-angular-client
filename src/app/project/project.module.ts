import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectRedirectGuard } from './project-redirect.guard';
import { ProjectSharedModule } from './project-shared.module';
import { ProjectContainer } from './project.container';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'default' },
  { path: 'new', component: NewProjectComponent },
  {
    path: ':projectId',
    component: ProjectContainer,
    canActivate: [ProjectRedirectGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'microservices',
        loadChildren: () => import('../microservice/microservice.module').then((m) => m.MicroserviceModule),
      },
      {
        path: 'workflows',
        loadChildren: () => import('../workflow/workflow.module').then((m) => m.WorkflowModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  declarations: [CreateProjectComponent, ProjectContainer, NewProjectComponent],
  imports: [
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    ProjectSharedModule,
    LayoutModule,
  ],
  exports: [],
})
export class ProjectModule {}
