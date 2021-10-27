import { Injectable } from '@angular/core';
import { Engine, Node, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IWorkflow, NodeType } from './models';
import components from './components';
import { getMockMethod } from 'src/app/mocks';

@Injectable()
export class FlowEditorService {
  resize$ = new Subject();
  editor!: NodeEditor;
  engine!: Engine;
  globals: Node[] = [];
  id = 0;
  private _contextMenuButtons = {
    nodeItems: {
      'Click me'() {
        console.log('Works for node!');
      },
      Delete: false, // don't show Delete item
      Clone: false, // or Clone item
    },
    items: {
      'Add new MS Call': {
        Random: () => {
          this.createComponent(
            NodeType.MicroserviceCall,
            getMockMethod(this.id)
          );
          this.id++;
        },
      },
    },
  };

  async createComponent(type: NodeType, data: any) {
    const component = components.get(type);
    const payload = JSON.parse(JSON.stringify(data));
    if (component) {
      const node = await component?.createNode(payload);
      // Get either the last node's position or start by default
      const [x, y] = this.editor.nodes.length
        ? this.editor.nodes[this.editor.nodes.length - 1].position
        : [-300, 100];
      node.position = [x + 400, y];
      this.editor.addNode(node);
    }
  }

  private _createEditor(container: HTMLElement) {
    const editor = new NodeEditor('demo@0.2.0', container);
    editor.use(ConnectionPlugin);
    editor.use(AngularRenderPlugin);
    editor.use(ContextMenuPlugin, this._contextMenuButtons);

    return editor;
  }

  async init(container: HTMLElement, flow?: IWorkflow) {
    this.editor = this._createEditor(container);
    this.engine = new Engine('demo@0.2.0');
    // register components
    components.forEach((component) => {
      this.editor.register(component);
      this.engine.register(component);
    });
    this.editor.on(
      [
        'process',
        'nodecreated',
        'noderemoved',
        'connectioncreated',
        'connectionremoved',
      ],
      (async () => {
        await this.engine.abort();
        await this.engine.process(this.editor.toJSON());
      }) as any
    );
    this.editor.view.resize();
    this.editor.trigger('process');
    this.resize$.pipe(debounceTime(5)).subscribe(() => {
      this.editor.nodes.forEach((node) =>
        this.editor.view.updateConnections({ node })
      );
    });
  }

  async createGlobalComponent(data: any) {
    this.globals.forEach((node) => this.editor.removeNode(node));
    const component = components.get(NodeType.Global);
    const payload = JSON.parse(JSON.stringify(data));
    if (component) {
      const node = await component.createNode(payload);
      node.position = [0, 0];
      this.editor.addNode(node);
      this.globals.push(node);
    }
  }
}
