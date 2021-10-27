import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { MicroserviceRoutingModule } from './microservice-routing.module';
import { MicroserviceListComponent } from './microservice-list/microservice-list.component';
import { ImportMicroserviceComponent } from './import-microservice/import-microservice.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MicroserviceListComponent, ImportMicroserviceComponent],
  imports: [
    MicroserviceRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class MicroserviceModule {}
