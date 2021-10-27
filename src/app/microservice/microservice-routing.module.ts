import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroserviceListComponent } from './microservice-list/microservice-list.component';

const routes: Routes = [{ path: '', component: MicroserviceListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicroserviceRoutingModule {}
