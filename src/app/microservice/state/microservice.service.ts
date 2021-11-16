import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { MicroserviceStore, MicroserviceState } from './microservice.store';

@Injectable({ providedIn: 'root' })
export class MicroserviceService extends NgEntityService<MicroserviceState> {
  constructor(protected store: MicroserviceStore) {
    super(store, { resourceName: 'microservices' });
  }

  getByProjectId(projectId: string) {
    return this.get({ params: { projectId } }, { upsert: true });
  }
}
