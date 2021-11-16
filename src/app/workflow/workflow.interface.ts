import { NodesData } from 'rete/types/core/data';
import { Input, Output } from 'rete';
export enum StepInputType {
  Object = 'object',
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Array = 'array',
}
export interface StepInput<T = any> {
  type: StepInputType;
  format?: string;
  items?: StepInput;
  $ref?: string;
  default?: any;
  properties?: {
    [propertyName: string]: StepInput;
  };
  name?: string;
  reteInput?: Input | Output;
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

export interface IWorkflow<T = string | NodesData> {
  id: string;
  name: string;
  url: string;
  httpMethod: 'post' | 'get' | 'put' | 'delete' | 'patch';
  nodes: T;
  authWorkflow?: string;
  output: IStepPayload;
}

export enum NodeType {
  MicroserviceCall = 'MS_CALL',
  ExecuteCode = 'EXEC_CODE',
  Switch = 'SWITCH',
  /**
   * Global node, such as body, queryParams, user, etc...
   */
  Global = 'GLOBAL',
}

export interface MicroserviecMethod {}
export interface IStep {
  $$type: NodeType;
  name?: string;
  pattern?: string | object;
  payload?: IStepPayload;
  method: MethodDefinition;
  /**
   * After executing this step the returned value can be modified,
   * by passing the path to a field from output.
   */
  readFrom?: string | null;
}

export interface IStepPayload {
  /**
   * each key in payload can either be:
   *  string - '{{request.body.firstName}}'
   *  StepPayload - {
   *                  profile: {
   *                      firstName: '{{request.body.firstName}}', // string
   *                      lastName: {
   *                         type: NodeType.MicroserviceCall
   *                         pattern: '@category/get_all',
   *                         payload: {
   *                          status: 'active' // hardcoded string
   *                         }
   *                      } // IStep
   *                  } // IStepPayload
   *                }
   *
   */
  [key: string]: string | IStep | IStepPayload;
}
