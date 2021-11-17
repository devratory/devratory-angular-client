import { Component, Input, Node, Output } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { StepInput } from '../models';
import { numSocket } from '../sockets';
import { createIO } from './createIO';
import { MsCallStepComponent } from './ms-call-step/ms-call-step.component';

export class ServiceCallComponent extends Component implements AngularComponent {
  data!: AngularComponentData;

  constructor() {
    super('MS_CALL');
    this.data.render = 'angular';
    this.data.component = MsCallStepComponent;
  }

  async builder(node: any) {
    const {
      microservice: {
        name: msName,
        contract: { definitions },
      },
      method: { name: methodName, input, output },
    } = node.data;
    const prefix = `${msName}/${methodName}`;
    node.data.method.flowIn = new Input(`${prefix}.flowIn`, 'FlowIn', numSocket);
    node.data.method.flowOut = new Output(`${prefix}.flowOut`, 'FlowOut', numSocket);
    node.addInput(node.data.method.flowIn);
    node.addOutput(node.data.method.flowOut);
    node.data.method = {
      ...node.data.method,
      input: this._resolveRef(node.data.microservice.contract.definitions, node.data.method.input),
      output: this._resolveRef(node.data.microservice.contract.definitions, node.data.method.output),
    };
    if (node.data.method.input) {
      createIO(node, node.data.method.input, `${prefix}.input`);
    }
    if (node.data.method.output) {
      createIO(node, node.data.method.output, `${prefix}.output`, false);
    }
  }

  _resolveRef(definitions: { [definitionName: string]: StepInput }, input: StepInput): StepInput | null {
    if (!input) {
      return null;
    }
    if (!input.$ref) {
      const props = Object.entries(input.properties || {});
      if (props.length) {
        input.properties = props.reduce(
          (properties, [name, prop]) => ({ ...properties, [name]: this._resolveRef(definitions, { ...prop, name }) }),
          {}
        );
      }
      if (input.items) {
        input.items = this._resolveRef(definitions, input.items) as any;
      }
      return input;
    }

    const refName = input.$ref?.split('definitions/')[1] as string;
    return { ...input, ...this._resolveRef(definitions, definitions[refName]), name: refName };
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}

  created(node: Node) {
    console.log('created', node);
  }

  destroyed(node: Node) {
    console.log('destroyed', node);
  }
}
