import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { Microservice } from './microservice.model';
import { MicroserviceStore, MicroserviceState } from './microservice.store';

@Injectable({ providedIn: 'root' })
export class MicroserviceService extends NgEntityService<MicroserviceState> {
  constructor(protected store: MicroserviceStore) {
    super(store, { resourceName: 'microservices' });
  }

  getByProjectId(projectId: string) {
    return this.get<Microservice[]>({ params: { projectId } }, { upsert: true });
  }
}
