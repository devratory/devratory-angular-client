export interface Project {
  id: string;
  name: string;
  environmentTag: 'prod' | 'stag' | 'dev' | 'test';
}
