import { Input, Output } from 'rete';

export interface StepInput<T, E = string[] | number[]> {
  name: string;
  type: T;
  optional: boolean;
  default: any;
  enum?: E;
  description: string;
  reteInput: any;
  key: string;
}

export interface MethodDefinition {
  name: string;
  input: StepInput<any>;
  pattern: any;
  type: 'MessagePattern' | 'EventPattern';
  output: StepInput<any>;
  flowOut?: Output;
  flowIn?: Input;
}
