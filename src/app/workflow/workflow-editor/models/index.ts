export * from '../../workflow.interface';

export interface Endpoint {
  name: string;
  url: string;
  method: 'post' | 'patch' | 'put' | 'get' | 'delete';
}
