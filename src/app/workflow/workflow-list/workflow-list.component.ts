import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from 'src/app/project/project.service';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  workflows$ = this.service.items$;
  constructor(private service: WorkflowService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.service.getByProjctId(this.projectService.getActiveId(), true).subscribe();
  }
}
