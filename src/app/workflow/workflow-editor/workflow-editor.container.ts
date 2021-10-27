import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IWorkflow } from './models';
import { ToolbarChangeEvent } from './components/flow-editor-toolbar/flow-editor-toolbar.component';
import { FlowEditorService } from './workflow-editor.service';

@Component({
  selector: 'dl-workflow-editor',
  template: `
    <div class="wrapper">
      <dl-flow-editor-toolbar
        (toolbarChange)="onToolbarChange($event)"
        [workflows]="workflows"
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
export class FlowEditorContainer implements AfterViewInit {
  @ViewChild('nodeEditor', { static: true }) el!: ElementRef;
  @Input() flow!: IWorkflow;
  @Input() workflows: IWorkflow[] = [
    { id: '1', name: 'GetAuthUser' },
    { id: '1', name: 'GetEvents' },
  ] as any;

  constructor(private service: FlowEditorService) {}

  ngAfterViewInit() {
    this.service.init(this.el.nativeElement, this.flow);
  }

  onToolbarChange(ev: ToolbarChangeEvent) {
    const globals: any = {};

    if (['POST', 'PATCH', 'PUT'].includes(ev.httpMethod?.toUpperCase())) {
      globals.body = {
        name: 'body',
        type: {

        }
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
        type: 'string',
      };
    }

    this.service.createGlobalComponent(globals);
    //create globals
  }

  private _arrToStepInput(items: string[], name: string) {
    return {
      name: name,
      type: items.reduce(
        (itemMap, item) => ({
          ...itemMap,
          [item]: {
            name: item,
            type: 'string',
            optional: false,
          },
        }),
        {}
      ),
    };
  }
}
