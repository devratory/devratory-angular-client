import { Node, Output, Input } from 'rete';
import { StepInput } from '../models';
import { numSocket } from '../sockets';

export function createIO(
  node: Node,
  input: StepInput<any>,
  prefix: string,
  isInput = true
) {
  const isArray = Array.isArray(input?.type);
  const canExpand =
    (!isArray || typeof input.type[0] === 'object') &&
    typeof input?.type === 'object';
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
    Object.entries(input.type).forEach(([name, innerInput]: [string, any]) => {
      (innerInput as StepInput<any>).name = name;
      createIO(node, innerInput, `${prefix}.${name}`, isInput);
    });
  }
}
