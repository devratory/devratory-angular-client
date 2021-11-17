import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { createIO } from './createIO';
import { GlobalParamComponent } from './global-param/global-param.component';

export class GlobalParamComponentBuilder extends Component implements AngularComponent {
  data!: AngularComponentData;

  constructor() {
    super('GLOBAL_PARAM');
    this.data.render = 'angular';
    this.data.component = GlobalParamComponent;
  }

  async builder(node: Node) {
    Object.values(node.data).forEach((output: any) => {
      createIO(node, output, `${output.name}`, false);
    });
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}

  created(node: Node) {
    console.log('created', node);
  }

  destroyed(node: Node) {
    console.log('destroyed', node);
  }
}
