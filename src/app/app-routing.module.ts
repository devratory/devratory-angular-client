import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrivateAppComponent } from './private-app.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    component: PrivateAppComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'microservices',
        loadChildren: () => import('./microservice/microservice.module').then((m) => m.MicroserviceModule),
      },
      {
        path: 'workflows',
        loadChildren: () => import('./workflow/workflow.module').then((m) => m.WorkflowModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
