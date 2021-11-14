import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Microservice } from './microservice.model';

export interface MicroserviceState extends EntityState<Microservice> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'microservice' })
export class MicroserviceStore extends EntityStore<MicroserviceState> {

  constructor() {
    super();
  }

}
