import { Injectable } from '@angular/core';
import { Engine, Node, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IWorkflow, NodeType } from './models';
import components from './components';
import { getMockMethod } from 'src/app/mocks';

@Injectable()
export class FlowEditorService {
  ready$ = new BehaviorSubject(false);
  resize$ = new Subject();
  editor!: NodeEditor | null;
  engine!: Engine | null;
  globals!: Node | null;
  id = 0;
  private _contextMenuButtons = {
    nodeItems: {
      'Click me'() {},
      Delete: false, // don't show Delete item
      Clone: false, // or Clone item
    },
    items: {
      'Add new MS Call': {
        Random: () => {
          this.createComponent(NodeType.MicroserviceCall, getMockMethod(this.id));
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
      const [x, y] = this.editor?.nodes.length
        ? this.editor?.nodes[this.editor?.nodes.length - 1].position
        : [-300, 100];
      node.position = [x + 400, y];
      this.editor?.addNode(node);
    }
  }

  private _createEditor(container: HTMLElement, id: string) {
    const editor = new NodeEditor(id, container);
    editor.use(ConnectionPlugin);
    editor.use(AngularRenderPlugin);
    editor.use(ContextMenuPlugin, this._contextMenuButtons);

    return editor;
  }

  async init(container: HTMLElement, flow?: IWorkflow<string> | null) {
    const id = (flow?.id || 'new-flow') + '@0.0.1';
    this.editor = this._createEditor(container, id);
    this.engine = new Engine(id);
    // register components
    components.forEach((component) => {
      this.editor?.register(component);
    });
    this.editor?.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], (async () => {
      await this.engine?.abort();
      await this.engine?.process((this.editor as NodeEditor).toJSON());
    }) as any);
    if (flow?.nodes) {
      try {
        console.log(JSON.parse(flow?.nodes));
        await this.editor?.fromJSON({ id, nodes: JSON.parse(flow?.nodes) });
        this.globals = this.editor.nodes.find((node) => node.name === 'GLOBAL_PARAM') || null;
      } catch (err) {
        console.log(err);
      }
    }
    this.editor?.view.resize();
    this.editor?.trigger('process');
    this.resize$.pipe(debounceTime(5)).subscribe(() => {
      this.editor?.nodes.forEach((node) => this.editor?.view.updateConnections({ node }));
    });
    this.ready$.next(true);
  }

  async createGlobalComponent(data: any) {
    console.log('Creating global component', data);
    const currentConnections = this.globals?.getConnections();
    this.removeGlobals();
    const component = components.get(NodeType.Global);
    const payload = JSON.parse(JSON.stringify(data));
    if (component) {
      const node = await component.createNode(payload);
      node.position = [0, 0];
      this.globals = node;
      this.editor?.addNode(this.globals);
      setTimeout(() => {
        currentConnections?.forEach(({input, output}) => this.editor?.connect(output, input));
      }, 200)
      // this.editor?.connect()
    }
  }

  reset() {
    this.editor?.destroy();
    this.engine?.destroy();

    this.editor = null;
    this.engine = null;

    this.ready$.next(false);
    this.removeGlobals();
  }

  removeGlobals() {
    if (this.globals) {
      this.editor?.removeNode(this.globals);
      this.globals = null;
    }
  }
}
