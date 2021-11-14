import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MicroserviceStore, MicroserviceState } from './microservice.store';

@Injectable({ providedIn: 'root' })
export class MicroserviceQuery extends QueryEntity<MicroserviceState> {

  constructor(protected store: MicroserviceStore) {
    super(store);
  }

}
