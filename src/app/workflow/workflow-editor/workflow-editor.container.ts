import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IWorkflow } from './models';
import { ToolbarChangeEvent } from './components/flow-editor-toolbar/flow-editor-toolbar.component';
import { FlowEditorService } from './workflow-editor.service';
import { StepInputType } from './models';

@Component({
  selector: 'dl-workflow-editor',
  template: `
    <div class="wrapper">
      <dl-flow-editor-toolbar
        (toolbarChange)="onToolbarChange($event)"
        (saveClick)="onSave($event)"
        [workflows]="workflows"
        [workflow]="workflow"
      ></dl-flow-editor-toolbar>
      <div #nodeEditor class="node-editor"></div>
    </div>
  `,
  styles: [
    `
      .wrapper {
        height: 100%;
        padding: 25px;
      }

      .socket.number {
        background: #96b38a;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowEditorContainer implements AfterViewInit, OnDestroy {
  @ViewChild('nodeEditor', { static: true }) el!: ElementRef;
  @Input() flow!: IWorkflow;
  @Input() isCreate = false;
  private _workflow: IWorkflow<string> | null = null;
  @Input() set workflow(workflow: IWorkflow<string> | null) {
    this._workflow = workflow;
    if (workflow) {
      this.service.init(this.el.nativeElement, workflow);
    }
  }
  get workflow(): IWorkflow<string> | null {
    return this._workflow;
  }
  @Input() workflows: IWorkflow[] = [
    { id: '1', name: 'GetAuthUser' },
    { id: '1', name: 'GetEvents' },
  ] as any;

  @Output() save = new EventEmitter<any>();

  constructor(private service: FlowEditorService) {}

  ngAfterViewInit() {
    if (this.isCreate) {
      this.service.init(this.el.nativeElement, {} as any);
    }
  }

  ngOnDestroy() {
    this.service.reset();
  }

  onToolbarChange(ev: ToolbarChangeEvent) {
    if (!this.service.ready$.getValue()) {
      console.log('Service not ready');
      return;
    }

    const globals: any = {};
    console.log('Toolbar change, and service ready', ev);

    if (['POST', 'PATCH', 'PUT'].includes(ev.httpMethod?.toUpperCase())) {
      globals.body = {
        name: 'body',
        type: StepInputType.Object,
        properties: {},
      };
    }

    if (ev.url) {
      const [url, search] = ev.url.split('?');
      const queryParams = (search || '').split('&');
      const params = url.split('/').reduce((filteredParams, path) => {
        const [_, param] = path.split(':');
        return param ? [...filteredParams, param] : filteredParams;
      }, [] as string[]);

      globals.queryParams = this._arrToStepInput(queryParams, 'queryParams');
      globals.params = this._arrToStepInput(params, 'params');
    }

    if (ev.authWorkflow) {
      globals.user = {
        name: 'user',
        type: StepInputType.Object,
        properties: {
          id: {
            type: StepInputType.String,
          },
        },
      };
    }

    this.service.createGlobalComponent(globals);
  }

  private _arrToStepInput(items: string[], name: string) {
    return {
      name: name,
      type: StepInputType.Object,
      properties: items.reduce(
        (itemMap, item) => ({
          ...itemMap,
          [item]: {
            name: item,
            type: StepInputType.String,
            optional: false,
          },
        }),
        {}
      ),
    };
  }
  onSave(toolbarForm: ToolbarChangeEvent) {
    this.save.emit({
      ...toolbarForm,
      ...this.service.editor?.toJSON(),
    });
  }
}
