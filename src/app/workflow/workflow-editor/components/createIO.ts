import { Node, Output, Input } from 'rete';
import { StepInput, StepInputType } from '../models';
import { numSocket } from '../sockets';

export function createIO(node: Node, input: StepInput, prefix: string, isInput = true) {
  const isArray = input.type === StepInputType.Array;
  const canExpand = !isArray && !!Object.keys(input.properties || {}).length;
  // Create input for top level
  if (isInput) {
    const reteInput = new Input(prefix, input.name || '', numSocket);
    input.reteInput = reteInput;
    node.addInput(reteInput);
  } else {
    const reteOutput = new Output(prefix, input.name || '', numSocket);
    input.reteInput = reteOutput;
    node.addOutput(reteOutput);
  }

  if (canExpand) {
    Object.entries(input.properties || {}).forEach(([name, innerInput]: [string, any]) => {
      (innerInput as StepInput).name = name;
      createIO(node, innerInput, `${prefix}.${name}`, isInput);
    });
  }
}
