import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { MicroserviceRoutingModule } from './microservice-routing.module';
import { MicroserviceListComponent } from './microservice-list/microservice-list.component';
import { ImportMicroserviceComponent } from './import-microservice/import-microservice.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [MicroserviceListComponent, ImportMicroserviceComponent],
  imports: [
    MicroserviceRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ],
})
export class MicroserviceModule {}
