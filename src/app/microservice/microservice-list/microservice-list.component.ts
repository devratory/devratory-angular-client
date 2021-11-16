import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineQueries } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { ProjectQuery } from 'src/app/project/state';
import { ImportMicroserviceComponent } from '../import-microservice/import-microservice.component';
import { MicroserviceQuery } from '../state/microservice.query';
import { MicroserviceService } from '../state/microservice.service';

interface MethodDefinition {
  name: string;
}

export interface IMicroservice {
  name: string;
  methods: MethodDefinition[];
}

@Component({
  selector: 'app-microservice-list',
  templateUrl: './microservice-list.component.html',
  styleUrls: ['./microservice-list.component.scss'],
})
export class MicroserviceListComponent implements OnInit {
  microservices$ = combineQueries([this.query.microservices$, this.projectQuery.selectActiveId()]).pipe(
    map(([microservices, projectId]) => microservices.filter((ms) => ms.projectId === projectId))
  );
  constructor(
    private dialog: MatDialog,
    private query: MicroserviceQuery,
    private service: MicroserviceService,
    private projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.projectQuery.selectActiveId().subscribe();
    this.service.getByProjectId(this.projectQuery.getActiveId()).subscribe();
  }

  onClickImport() {
    const dialogRef = this.dialog.open(ImportMicroserviceComponent, ImportMicroserviceComponent.config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
