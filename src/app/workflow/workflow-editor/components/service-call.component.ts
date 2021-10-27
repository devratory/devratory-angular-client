import { Component, Input, Node, Output } from 'rete';
import {
  AngularComponent,
  AngularComponentData,
} from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { MethodDefinition } from '../models';
import { numSocket } from '../sockets';
import { createIO } from './createIO';
import { MsCallStepComponent } from './ms-call-step/ms-call-step.component';

export interface MSCallNode extends Omit<Node, 'data'> {
  data: { methodDefinition: { ms: string; method: MethodDefinition } };
}

interface TreeInput {
  input: Input;
  name: string;
  data: any;
  children: TreeInput[];
}
export class ServiceCallComponent
  extends Component
  implements AngularComponent
{
  data!: AngularComponentData<{
    methodDefinition: { ms: string; method: MethodDefinition };
  }>;
  treeInput!: TreeInput;

  constructor() {
    super('MS_CALL');
    this.data.render = 'angular';
    this.data.component = MsCallStepComponent;
    this.data.props = {
      methodDefinition: {} as any,
    };
  }

  async builder(node: any) {
    node.data.method.flowIn = new Input(
      `${node.data.ms}/${node.data.method.name}.flowIn`,
      'FlowIn',
      numSocket
    );
    node.data.method.flowOut = new Output(
      `${node.data.ms}/${node.data.method.name}.flowOut`,
      'FlowOut',
      numSocket
    );
    node.addInput(node.data.method.flowIn);
    node.addOutput(node.data.method.flowOut);
    createIO(
      node,
      node.data.method.input,
      `${node.data.ms}/${node.data.method.name}.input`
    );
    createIO(
      node,
      node.data.method.output,
      `${node.data.ms}/${node.data.method.name}.output`,
      false
    );
    this.data.props = {
      methodDefinition: node.data,
    };
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}

  created(node: Node) {
    console.log('created', node);
  }

  destroyed(node: Node) {
    console.log('destroyed', node);
  }
}
