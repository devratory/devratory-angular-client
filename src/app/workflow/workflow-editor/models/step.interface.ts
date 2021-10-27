import { MethodDefinition } from './method-definition.interface';

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
