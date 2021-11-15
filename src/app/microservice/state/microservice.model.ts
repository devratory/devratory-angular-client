class ContractDefinition {}
class ContractMethod {
  name!: string;
  description!: string;
  type!: 'MessagePattern' | 'EventPattern';
  pattern!: string;
  input?: string; // reference to definition
  output?: string; // reference to definition
}

interface MicroserviceDependencyDefinition {
  required?: boolean;
  description?: string;
  version: string;

  selected?: boolean;
}

interface EnvironmentVariableDefinition {
  description?: string;
  example?: string;
  default?: any;

  // Set by user on UI
  value?: string;
}

export class Contract {
  id!: string;
  name!: string;
  variables = {};
  version!: string;
  transport!: number;
  definitions!: {
    [key: string]: ContractDefinition;
  };
  methods!: ContractMethod[];
  createdBy!: string;
  dependencies: { [microserviceName: string]: MicroserviceDependencyDefinition } = {};
  environmentVariables: { [variableName: string]: EnvironmentVariableDefinition } = {};

  static fromJSONString(jsonString: string): Contract | null {
    try {
      return JSON.parse(jsonString) as Contract;
    } catch (err) {
      console.warn('Selected file is not valid Contract');
      return null;
    }
  }
}

export interface Microservice {
  id?: string;
  name: string;
  dockerImageUrl: string;
  projectId: string;
  contract: Contract;
}

export function createMicroservice(params: Partial<Microservice>) {
  return {} as Microservice;
}
