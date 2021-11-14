import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

class ContractDefinition {}
class ContractMethod {
  name!: string;
  description!: string;
  type!: 'MessagePattern' | 'EventPattern';
  pattern!: string;
  input?: string; // reference to definition
  output?: string; // reference to definition
}

export class Contract {
  id!: string;
  name!: string;
  version!: string;
  transport!: number;
  definitions!: {
    [key: string]: ContractDefinition;
  };
  methods!: ContractMethod[];
  createdBy!: string;
}

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
  contract!: Contract;
  sourcePath!: string;
  contractName!: string;

  constructor(
    public dialogRef: MatDialogRef<ImportMicroserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { importType: 'source' | 'docker-image' }
  ) {}

  ngOnInit(): void {}

  onFileSelected(ev: Event) {
    const inputNode: any = ev.target;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      // This event listener will happen when the reader has read the file
      reader.addEventListener('load', () => {
        try {
          this.contract = JSON.parse(reader.result as any) as Contract;
        } catch (err) {
          console.warn('Selected file is not valid Contract');
        }
      });

      reader.readAsText(inputNode.files[0]); // Read the uploaded file
    }
  }
}
