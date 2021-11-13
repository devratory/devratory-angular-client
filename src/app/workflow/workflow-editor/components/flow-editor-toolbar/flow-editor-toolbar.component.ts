import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IWorkflow } from '../../models';

export interface ToolbarChangeEvent {
  httpMethod: string;
  url: string;
  authWorkflow: string;
}

@Component({
  selector: 'dl-flow-editor-toolbar',
  templateUrl: './flow-editor-toolbar.component.html',
  styleUrls: ['./flow-editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowEditorToolbarComponent {
  httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
  authenticationWorkflow: string = 'NO'; // workflow id
  toolbarForm = new FormGroup({
    httpMethod: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    authWorkflow: new FormControl(null),
  });
  @Input() workflows: IWorkflow[] = [];
  @Input() set workflow(wf: IWorkflow<string> | null) {
    if (wf) {
      const { httpMethod, url, authWorkflow } = wf;
      this.toolbarForm.setValue(
        {
          httpMethod,
          url,
          authWorkflow,
        },
        { emitEvent: false }
      );
    }
  }
  @Output() toolbarChange = this.toolbarForm.valueChanges.pipe(debounceTime(309));
  @Output() saveClick = new EventEmitter();
}
