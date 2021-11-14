import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../state';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  createProjectForm = this.fb.group({
    name: [null, Validators.required],
    environmentTag: ['dev'],
  });

  environmentTags = [
    { name: 'Development', id: 'dev' },
    { name: 'Staging', id: 'stag' },
    { name: 'Production', id: 'prod' },
  ];
  constructor(private fb: FormBuilder, private service: ProjectService) {}

  ngOnInit(): void {}

  createProject() {
    this.service.create(this.createProjectForm.getRawValue()).subscribe(console.log);
  }
}
