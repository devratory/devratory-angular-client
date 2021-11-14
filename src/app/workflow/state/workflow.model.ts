import { NodesData } from 'rete/types/core/data';
import { IStepPayload } from '../step-payload.interface';

export interface Workflow<T = string | NodesData> {
  id: string;
  name: string;
  url: string;
  httpMethod: 'post' | 'get' | 'put' | 'delete' | 'patch';
  nodes: T;
  projectId: string;
  authWorkflow?: string;
  output: IStepPayload;
}

export function createWorkflow(params: Partial<Workflow>) {
  return {} as Workflow;
}
