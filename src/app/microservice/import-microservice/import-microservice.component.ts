import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectQuery } from 'src/app/project/state';
import { Contract } from '../state/microservice.model';
import { MicroserviceService } from '../state/microservice.service';

@Component({
  selector: 'app-import-microservice',
  templateUrl: './import-microservice.component.html',
  styleUrls: ['./import-microservice.component.scss'],
})
export class ImportMicroserviceComponent {
  static config = {
    width: '800px',
  };
  titles = {
    source: 'Import from source',
    'docker-image': 'Import from Docker Image',
  };
  variables: {
    [variable: string]: string;
  } = {};

  name!: string;
  dockerImageUrl!: string;
  contract!: Contract;
  sourcePath!: string;
  contractName!: string;

  // public dialogRef: MatDialogRef<ImportMicroserviceComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: { importType: 'source' | 'docker-image' }
  data: { importType: 'source' | 'docker-image' } = {
    importType: 'docker-image',
  };

  constructor(
    private service: MicroserviceService,
    private dialogRef: MatDialogRef<ImportMicroserviceComponent>,
    private projectQuery: ProjectQuery
  ) {}

  onFileSelected(ev: Event) {
    const inputNode: any = ev.target;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      // This event listener will happen when the reader has read the file
      reader.addEventListener('load', () => {
        this.contract = Contract.fromJSONString(reader.result as string) as Contract;
        Object.values(this.contract.dependencies).forEach((dependency) => {
          if (dependency.required) {
            dependency.selected = true;
          }
        });
      });

      reader.readAsText(inputNode.files[0]); // Read the uploaded file
    }
  }

  create() {
    this.service
      .add({
        name: this.name,
        dockerImageUrl: this.dockerImageUrl,
        contract: this.contract,
        projectId: this.projectQuery.getActiveId(),
      })
      .subscribe((res) => {
        console.log(res);
        this.dialogRef.close(res);
      });
  }
}
