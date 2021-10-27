import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-import-microservice',
  templateUrl: './import-microservice.component.html',
  styleUrls: ['./import-microservice.component.scss'],
})
export class ImportMicroserviceComponent implements OnInit {
  titles = {
    source: 'Import from source',
    'docker-image': 'Import from Docker Image',
  };

  name!: string;
  dockerImageUrl!: string;
  contract!: File;
  sourcePath!: string;
  contractName!: string;

  constructor(
    public dialogRef: MatDialogRef<ImportMicroserviceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { importType: 'source' | 'docker-image' }
  ) {}

  ngOnInit(): void {}
}
