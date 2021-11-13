import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportMicroserviceComponent } from '../import-microservice/import-microservice.component';
import { MatDialog } from '@angular/material/dialog';

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
  microservices$ = new BehaviorSubject<IMicroservice[]>([]);
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onClickImport(importType: 'source' | 'docker-image') {
    const dialogRef = this.dialog.open(ImportMicroserviceComponent, {
      width: '450px',
      data: { importType },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
