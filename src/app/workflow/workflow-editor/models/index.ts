export * from './step.interface';
export * from './workflow.interface';
export * from './method-definition.interface';

export interface Endpoint {
  name: string;
  url: string;
  method: 'post' | 'patch' | 'put' | 'get' | 'delete';
}
