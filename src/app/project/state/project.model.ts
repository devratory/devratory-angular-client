export interface Project {
  id: string;
  name: string;
  environmentTag: 'prod' | 'stag' | 'dev' | 'test';
}

export function createProject(params: Partial<Project>) {
  return {} as Project;
}
